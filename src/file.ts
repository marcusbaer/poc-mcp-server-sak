import { z } from "zod";
import { BaseTools } from "./base.js";
import * as path from "node:path";
import { homedir } from "node:os";
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

export class FileTools extends BaseTools {
  getInstructions() {
    return [
      {
        name: "file-instruction",
        argsSchema: undefined,
        handle: this.promptHandle,
      },
    ];
  }

  getTools() {
    return [
      {
        name: "read-file",
        description:
          "Read a file from user home directory",
        inputSchema: z.object({
          filename: z.string().describe("Name of a file"),
        }),
        handle: this.readFileHandle,
      },
      {
        name: "write-file",
        description:
          "Write a file to user home directory",
        inputSchema: z.object({
          filename: z.string().describe("Name of a file"),
          body: z.string().describe("Content of the file, the file body."),
        }),
        handle: this.writeFileHandle,
      },
    ];
  }

  private async readFileHandle({ filename = "" }) {
    const dir = path.join(homedir(), filename);
    try {
      const fileContent = readFileSync(dir, { encoding: 'utf8' });
      const data = { success: true, path: dir, content: fileContent };
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        // Return empty content for non-existent files instead of throwing
        const data = { success: false, path: dir, content: '', error: 'File not found' };
        return { content: [{ type: "text", text: JSON.stringify(data) }] };
      }
      throw error;
    }
  }

  private async writeFileHandle({ filename = "", body = "" }) {
    const dir = path.join(homedir(), filename);
    const dirPath = path.dirname(dir);
    // Create parent directories if they don't exist
    mkdirSync(dirPath, { recursive: true });
    // Write file (flag 'w' creates new file or overwrites existing)
    writeFileSync(dir, body, { encoding: 'utf8', flag: 'w' });
    const data = { success: true, path: dir };
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }

  private async promptHandle(args: any) {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `
              You are able to read or write a file from or to user home to add it to the context.
              When ever the user is asking for reading a file, you can try to use one of the tools, provided by Swiss Army Knife MCP.
              When ever the user is asking for writing a file, you can try to use one of the tools, provided by Swiss Army Knife MCP.
            `,
          },
        },
      ],
    };
  }
}
