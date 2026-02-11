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
        description:
          "Get current UTC time. Returns a JSON object with 'time' and 'timestamp'.",
        inputSchema: undefined,
        // outputSchema: z.object({
        //   time: z.string().describe("ISO formatted UTC time"),
        //   timestamp: z.number().describe("UTC timestamp"),
        // }),
        handle: this.utcHandle,
      },
      {
        name: "local-time",
        description:
          "Get current local time. Returns a JSON object with 'time', 'city' and 'note'.",
        inputSchema: z.object({
          city: z.string().describe("Name of a city"),
        }),
        // outputSchema: z.object({
        //   city: z.string().describe("Name of a city"),
        //   time: z.string().describe("ISO formatted time"),
        //   note: z.string().describe("Additional note"),
        // }),
        handle: this.localHandle,
      },
    ];
  }

  private async localHandle({ city = "" }) {
    const now = new Date();
    const data = {
      city,
      time: now.toISOString(),
      note: "Local time feature is not yet supported. Returned time is ISO formatted UTC time only.",
    };
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }

  private async utcHandle() {
    const now = new Date();
    const data = {
      time: now.toISOString(),
      timestamp: now.getTime(),
    };
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
