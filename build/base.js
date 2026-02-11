export class BaseTools {
    server;
    constructor(server) {
        this.server = server;
        this.registerInstructions(server);
        this.registerTools(server);
    }
    getInstructions() {
        return [];
    }
    getTools() {
        return [];
    }
    async registerInstructions(server) {
        const instructions = this.getInstructions();
        instructions.forEach((instruction) => {
            this.addPrompt(server, instruction);
        });
    }
    async registerTools(server) {
        const tools = this.getTools();
        tools.forEach((tool) => {
            this.addTool(server, tool);
        });
    }
    async addTool(server, { name, description, inputSchema, outputSchema, handle }) {
        server.registerTool(name, { description, inputSchema, outputSchema }, handle);
    }
    async addPrompt(server, { name, argsSchema, handle }) {
        server.registerPrompt(name, {
            argsSchema,
        }, handle);
    }
}
