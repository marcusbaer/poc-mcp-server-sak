# Swiss Army Knife MCP

This MCP is a playground to understand how MCP is working.
In terms of a swiss army knife, it provides several more or less useful tools.

## Installation

```sh
npm install -g poc-mcp-server-sak
```

How to setup Swiss Army Knife MCP

```json
{
  "servers": {
    "Swiss Army Knife MCP": {
      "type": "stdio",
      "command": "npx",
      "args": [
         "-y",
         "poc-mcp-server-sak"
      ]
    }
  },
  "inputs": []
}
```

## MCP Inspector 


```sh
docker run --rm --network host -p 6274:6274 -p 6277:6277 ghcr.io/modelcontextprotocol/inspector:latest
```

## Tools

### hello

Greets the client, some sort of ping. Is using the name, if known.

**Params:**

- `name` (optional): string

### random-city

Returns a random city and its country.

### utc-time

Returns UTC timestamp.

### local-time

Returns local time, by a given city, if applicable.

**Params:**

- `city`: string

### fetch (tbd.)

Get content by URL.

**Params:**

- `url`: string

### markdown-to-html (tbd.)

convert markdown into HTML

