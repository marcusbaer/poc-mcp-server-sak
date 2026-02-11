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
        description: "Greet the user by tool usage",
        inputSchema: z.object({
          name: z.string().describe("Name of a person"),
        }),
        outputSchema: undefined,
        handle: this.helloHandle,
      },
    ];
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
}
