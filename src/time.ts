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
        outputSchema: {
          time: z.string().describe("ISO formatted UTC time"),
          timestamp: z.number().describe("UTC timestamp"),
        },
        handle: this.utcHandle,
      },
      {
        name: "local-time",
        description: "Get current local time",
        inputSchema: {
          city: z.string().describe("Name of a city"),
        },
        outputSchema: {
          city: z.string().describe("Name of a city"),
          time: z.string().describe("ISO formatted time"),
          note: z.string().describe("Additional note"),
        },
        handle: this.localHandle,
      },
    ];
  }

  private async localHandle({ city = "" }) {
    const now = new Date();
    const iso = now.toISOString();
    const json = {
      city,
      time: iso,
      note: "Local time feature is not yet supported. Returned time is ISO formatted UTC time only.",
    };
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(json, null, 2),
          mimeType: "application/json",
        },
      ],
    };
  }

  private async utcHandle() {
    const now = new Date();
    const iso = now.toISOString();
    const utc = now.getTime();
    const json = {
      time: iso,
      timestamp: utc,
    };
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(json, null, 2),
          mimeType: "application/json",
        },
        // {
        //   type: "image",
        //   data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==", // Base64-kodiert
        //   mimeType: "image/png",
        // },
        // {
        //   type: "resource",
        //   resource: {
        //     uri: "cache://reports/daily-stats.json",
        //     text: "Full JSON report data...", // Optionaler Text-Content
        //     mimeType: "application/json",
        //   },
        // },
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
