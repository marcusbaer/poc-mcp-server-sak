#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { HelloTools } from "./hello.js";

const server = new McpServer({
  name: "Swiss Army Knife",
  version: "1.0.0",
});

const helloTools = new HelloTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Swiss Army Knife MCP is running on stdio...");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
