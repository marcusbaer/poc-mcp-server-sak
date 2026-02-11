import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { z } from "zod";

interface Tool {
  name: string;
  description: string;
  params: object;
  handle: Function;
}

export class HelloTools {
  constructor(private server: McpServer) {
    this.registerTools(server);
  }

  private async helloHandle() {
    return {
      content: [
        {
          type: "text",
          text: "Hello",
        },
      ],
    };
  }

  private async registerTools(server: McpServer) {
    const tools: Tool[] = [
      {
        name: "hello",
        description: "Greet the user by tool usage",
        params: {
          // name: z.string().describe("Name of a person"),
        },
        handle: this.helloHandle,
      },
    ];

    tools.forEach((tool) => {
      this.addTool(server, tool);
    });
  }

  private async addTool(
    server: McpServer,
    { name, description, params, handle }: Tool,
  ) {
    server.tool(name, description, params, handle);
  }
}
