import {
    McpServer,
    ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

const server = new McpServer({
    name: 'Ping-Pong',
    version: '1.0.0',
});

server.resource(
    'ping-pong',
    new ResourceTemplate('ping-pong://{message}', { list: undefined }),
    async (uri, { message }) => ({
        contents: [
            {
                uri: uri.href,
                text: `Resource ping-pong: ${message}`,
            },
        ],
    })
);

server.tool(
    'ping-pong',
    'This tool ping-pongs back any text you send it',
    { message: z.string() },
    async ({ message }) => ({
        content: [{ type: 'text', text: `Tool ping-pong: ${message}` }],
    })
);

server.prompt('ping-pong', { message: z.string() }, ({ message }) => ({
    messages: [
        {
            role: 'user',
            content: {
                type: 'text',
                text: `Please process this message: ${message}`,
            },
        },
    ],
}));

export { server };
