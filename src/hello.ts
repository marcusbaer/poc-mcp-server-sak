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

export class HelloTools {
  constructor(private server: McpServer) {
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
}
