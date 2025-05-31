// From: https://weaviate.io/developers/weaviate/quickstart
// Use `quickstart-setup.ts` to create the example collection.
// To run a query, edit this file, to uncomment the line that calls the query.

import { getClient } from './weaviateClient.js';

async function listCollections() {
    const client = await getClient();
    const collections = await client.collections.listAll();
    return collections;
}

// Run a fetch objects query
async function fetchObjects(collectionName: string) {
    const client = await getClient();

    const questionCollection = client.collections.get(collectionName);

    const response = await questionCollection.query.fetchObjects({
        limit: 1000,
    });

    return response;
}

// Run a near text query
async function nearTextQuery(collectionName: string, queryText: string) {
    const client = await getClient();
    const questions = client.collections.get(collectionName);

    const result = await questions.query.nearText(queryText, {
        filters: client.collections
            .get(collectionName)
            .filter.byProperty('wpsolr_type')
            .equal('product'),
        limit: 25,
        returnProperties: [
            'wpsolr_permalink',
            'wpsolr_title',
            'wpsolr_content',
            'wpsolr__price_str',
            'wpsolr__regular_price_str',
            'wpsolr__sale_price_str',
        ],
    });

    return result;
}

// // Run a near text query
// async function nearTextQuery(collectionName: string, queryText: string) {
//     const questions = client.collections.get(collectionName);

//     const result = await questions.query.nearText(queryText, {
//         limit: 1000,
//     });

//     return result;
// }

// // Add a boolean filter
// async function nearTextWhereQuery() {
//     const questions = client.collections.get(collectionName);

//     const result = await questions.query.nearText('biology', {
//         filters: client.collections
//             .get(collectionName)
//             .filter.byProperty('category')
//             .equal('ANIMALS'),
//         limit: 2,
//     });

//     for (let object of result.objects) {
//         console.log(JSON.stringify(object.properties, null, 2));
//     }
//     return result;
// }

// // Generative search query
// async function generativeSearchQuery() {
//     const questions = client.collections.get(collectionName);

//     const result = await questions.generate.nearText(
//         'biology',
//         { singlePrompt: `Explain {answer} as you might to a five-year-old.` },
//         { limit: 2 }
//     );

//     for (let object of result.objects) {
//         console.log(JSON.stringify(object.properties, null, 2));
//         console.log(object.generated);
//     }
//     return result;
// }

// // Generative search query - grouped prompt
// async function generativeSearchGroupedQuery() {
//     const questions = client.collections.get(collectionName);

//     const result = await questions.generate.nearText(
//         'biology',
//         { groupedTask: `Write a tweet with emojis about these facts.` },
//         { limit: 2 }
//     );

//     for (let object of result.objects) {
//         console.log(JSON.stringify(object.properties, null, 2));
//     }

//     console.log(result.generated);
//     return result;
// }

export { listCollections, fetchObjects, nearTextQuery };
