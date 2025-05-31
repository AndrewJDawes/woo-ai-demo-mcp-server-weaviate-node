// From: https://weaviate.io/developers/weaviate/quickstart
// Use `quickstart-setup.ts` to create the example collection.
// To run a query, edit this file, to uncomment the line that calls the query.

import weaviate, { WeaviateClient } from 'weaviate-client';

let client: WeaviateClient | undefined;
// Create client object
export async function getClient() {
    if (client) {
        return client;
    }
    return await weaviate.connectToCustom({
        httpHost: process.env.WEAVIATE_HTTP_HOST ?? 'weaviate',
        httpPort:
            process.env.WEAVIATE_HTTP_PORT &&
            !isNaN(parseInt(process.env.WEAVIATE_HTTP_PORT))
                ? parseInt(process.env.WEAVIATE_HTTP_PORT)
                : 8080,
        httpSecure: Boolean(process.env.WEAVIATE_HTTP_HOST),
        grpcHost: process.env.WEAVIATE_GRPC_HOST ?? 'weaviate',
        grpcPort:
            process.env.WEAVIATE_GRPC_PORT &&
            !isNaN(parseInt(process.env.WEAVIATE_GRPC_PORT))
                ? parseInt(process.env.WEAVIATE_GRPC_PORT)
                : 50051,
        grpcSecure: Boolean(process.env.WEAVIATE_GRPC_HOST),
    });
}
