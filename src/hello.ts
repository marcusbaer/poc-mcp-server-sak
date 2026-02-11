import { z } from "zod";
import { BaseTools } from "./base.js";

export class HelloTools extends BaseTools {
  getInstructions() {
    return [
      {
        name: "hello-instruction",
        argsSchema: z.object({
          name: z.string().describe("Name of a person"),
        }),
        handle: this.promptHandle,
      },
    ];
  }

  getTools() {
    return [
      {
        name: "hello",
        description:
          "Greet the user by tool usage. Returns a JSON object with 'name' and 'greeting'.",
        inputSchema: z.object({
          name: z.string().describe("Name of a person"),
        }),
        outputSchema: undefined,
        handle: this.helloHandle,
      },
    ];
  }

  private async helloHandle({ name = "" }) {
    const data = {
      name,
      greeting: name ? `Hello, ${name}` : `Hello`,
    };
    return {
      content: [
        { type: "text", text: JSON.stringify(data) },
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
        // {
        //   type: "text",
        //   text: JSON.stringify(data),
        //   mimeType: "application/json",
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
            text: `You are now the personal assistant of the user. 
                 RULES:
                 1. if no name has been provided so far, ask for it
                 2. if the user has provided a name, address him with his name ${args.name}`,
          },
        },
      ],
    };
  }
}
