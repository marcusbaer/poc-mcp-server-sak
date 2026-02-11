import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  AnySchema,
  ZodRawShapeCompat,
} from "@modelcontextprotocol/sdk/server/zod-compat.js";

interface Tool {
  name: string;
  description: string;
  inputSchema?: AnySchema | ZodRawShapeCompat | undefined;
  outputSchema?: AnySchema | ZodRawShapeCompat | undefined;
  handle: Function;
}

interface Prompt {
  name: string;
  handle: Function;
  argsSchema?: ZodRawShapeCompat | undefined;
}

export class HelloTools {
  constructor(private server: McpServer) {
    this.registerInstructions(server);
    this.registerTools(server);
  }

  private async helloHandle({ name = "" }) {
    return {
      content: [
        {
          type: "text",
          text: name ? `Hello, ${name}` : `Hello`,
        },
      ],
    };
  }

  private async promptHandle(args: any) {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `You are now the personal assistant of the user. 
                 RULES:
                 1. if no name has been provided so far, ask for it
                 2. if the user has provided a name, address him with his name ${args.name}`,
          },
        },
      ],
    };
  }

  private async registerInstructions(server: McpServer) {
    const instructions: Prompt[] = [
      {
        name: "hello-instruction",
        argsSchema: {
          name: z.string().describe("Name of a person"),
        },
        handle: this.promptHandle,
      },
    ];

    instructions.forEach((instruction) => {
      this.addPrompt(server, instruction);
    });
  }

  private async registerTools(server: McpServer) {
    const tools: Tool[] = [
      {
        name: "hello",
        description: "Greet the user by tool usage",
        inputSchema: {
          name: z.string().describe("Name of a person"),
        },
        outputSchema: undefined,
        handle: this.helloHandle,
      },
    ];

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
