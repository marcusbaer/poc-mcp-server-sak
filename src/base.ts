import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  AnySchema,
  ZodRawShapeCompat,
} from "@modelcontextprotocol/sdk/server/zod-compat.js";

interface Tool {
  name: string;
  description: string;
  handle: Function;
  inputSchema?: AnySchema | ZodRawShapeCompat | undefined;
  outputSchema?: AnySchema | ZodRawShapeCompat | undefined;
}

interface Prompt {
  name: string;
  handle: Function;
  argsSchema?: ZodRawShapeCompat | undefined;
}

export class BaseTools {
  constructor(private server: McpServer) {
    this.registerInstructions(server);
    this.registerTools(server);
  }

  getInstructions() {
    return [] as any[];
  }

  getTools() {
    return [] as any[];
  }

  private async registerInstructions(server: McpServer) {
    const instructions: Prompt[] = this.getInstructions();

    instructions.forEach((instruction) => {
      this.addPrompt(server, instruction);
    });
  }

  private async registerTools(server: McpServer) {
    const tools: Tool[] = this.getTools();

    tools.forEach((tool) => {
      this.addTool(server, tool);
    });
  }

  private async addTool(
    server: McpServer,
    { name, description, inputSchema, outputSchema, handle }: Tool,
  ) {
    server.registerTool(
      name,
      { description, inputSchema, outputSchema },
      handle as any,
    );
  }

  private async addPrompt(
    server: McpServer,
    { name, argsSchema, handle }: Prompt,
  ) {
    server.registerPrompt(
      name,
      {
        argsSchema,
      },
      handle as any,
    );
  }
}
