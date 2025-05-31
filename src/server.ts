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
    name: process.env.MCP_SERVER_NAME ?? 'Woo AI Demo MCP Server Weaviate Node',
    version: process.env.MCP_SERVER_VERSION ?? '1.0.0',
});

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
        const collection = Array.isArray(params.collection)
            ? params.collection[0]
            : params.collection;
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
    'queryProducts',
    "This tool performs a semantic search of a store's products using the provided query text",
    {
        queryText: z.string().min(1),
    },
    async ({ queryText }) => {
        const collectionName =
            process.env.COLLECTION_NAME_PRODUCTS ?? 'Myindex';
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
