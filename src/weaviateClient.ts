// From: https://weaviate.io/developers/weaviate/quickstart
// Use `quickstart-setup.ts` to create the example collection.
// To run a query, edit this file, to uncomment the line that calls the query.

import weaviate, { WeaviateClient } from 'weaviate-client';

// Get environment variables
// Set these environment variables before you run the script. For more details,
// the README file
const weaviateCloudUrl = process.env.WCD_URL || 'http://weaviate:8080';
const weaviateCloudApiKey = process.env.WCD_API_KEY || 'NEEDS A CLOUD API KEY';
const openaiApiKey = process.env.OPENAI_API_KEY || 'NEEDS AN OPENAI API KEY';

// Create client object
const client: WeaviateClient = await weaviate.connectToCustom({
    httpHost: 'weaviate',
    httpPort: 8080,
    httpSecure: false,
    grpcHost: 'weaviate',
    grpcPort: 50051,
    grpcSecure: false,
});

export { client };
