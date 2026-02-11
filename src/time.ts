import { z } from "zod";
import { BaseTools } from "./base.js";

export class TimeTools extends BaseTools {
  getInstructions() {
    return [
      {
        name: "time-instruction",
        argsSchema: undefined,
        handle: this.promptHandle,
      },
    ];
  }

  getTools() {
    return [
      {
        name: "utc-time",
        description: "Get current UTC time",
        inputSchema: undefined,
        outputSchema: undefined,
        handle: this.utcHandle,
      },
      {
        name: "local-time",
        description: "Get current local time",
        inputSchema: {
          city: z.string().describe("Name of a city"),
        },
        outputSchema: undefined,
        handle: this.utcHandle,
      },
    ];
  }

  private async utcHandle({ name = "" }) {
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
            text: `
              You are able to provide a current date and time information to the context.
              When ever current time or date is needed, you can try one of the time tools, provided by Swiss Army Knife MCP.

              RULES:
              1. if city or location of the user is unknown, prefer the tool \`utc-time\` to get a UTC timestamp, which might require conversion into local time by you.
              2. if city or location of the user in know, prefer the tool \`local-time\` to get a current local time information
              3. if tool \`local-time\` to get a current local time is failing, fall back to UTC timestamp and try to fetch it by using the tool \`utc-time\`
            `,
          },
        },
      ],
    };
  }
}
