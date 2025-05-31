import {
    McpServer,
    ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import {
    listCollections,
    fetchObjects,
    nearTextQuery,
} from './weaviateMethods.js';

const server = new McpServer({
    name: 'Weaviate-MCP-Server',
    version: '1.0.0',
});

const collectionName = 'Myindex';

// Expose listCollections as a resource
server.resource(
    'collections',
    new ResourceTemplate('collections://', { list: undefined }),
    async (uri) => {
        const collections = await listCollections();
        return {
            contents: [
                {
                    uri: uri.href,
                    text: JSON.stringify(collections, null, 2),
                },
            ],
        };
    }
);

// Expose fetchObjects as a resource
server.resource(
    'objects',
    new ResourceTemplate('objects://{collection}', { list: undefined }),
    async (uri, params) => {
        // Ensure collection is a string
        const collection =
            typeof params.collection === 'string'
                ? params.collection
                : collectionName;
        const objects = await fetchObjects(collection);
        return {
            contents: [
                {
                    uri: uri.href,
                    text: JSON.stringify(objects, null, 2),
                },
            ],
        };
    }
);

// Expose nearTextQuery as a tool
server.tool(
    'near-text-query',
    'This tool performs a semantic search on a Weaviate collection using the provided query text',
    {
        collectionName: z.string().optional().default(collectionName),
        queryText: z.string().min(1),
    },
    async ({ collectionName, queryText }) => {
        try {
            const results = await nearTextQuery(collectionName, queryText);
            return {
                content: [
                    {
                        type: 'text',
                        text: `Query results for "${queryText}" in collection "${collectionName}": ${JSON.stringify(
                            results,
                            null,
                            2
                        )}`,
                    },
                ],
            };
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Unknown error occurred';
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error performing near text query: ${errorMessage}`,
                    },
                ],
            };
        }
    }
);

export { server };
