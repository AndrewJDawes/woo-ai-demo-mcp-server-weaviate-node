// From: https://weaviate.io/developers/weaviate/quickstart
// Use `quickstart-setup.ts` to create the example collection.
// To run a query, edit this file, to uncomment the line that calls the query.

import weaviate, { WeaviateClient } from 'weaviate-client';

// Get environment variables
// Set these environment variables before you run the script. For more details,
// the README file
const weaviateCloudUrl = process.env.WCD_URL || 'NEEDS A CLOUD URL';
const weaviateCloudApiKey = process.env.WCD_API_KEY || 'NEEDS A CLOUD API KEY';
const openaiApiKey = process.env.OPENAI_API_KEY || 'NEEDS AN OPENAI API KEY';

// Create client object
const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
    weaviateCloudUrl
    // {
    //     authCredentials: new weaviate.ApiKey(weaviateCloudApiKey),
    //     headers: { 'X-OpenAI-Api-Key': openaiApiKey },
    // }
);

export { client };
