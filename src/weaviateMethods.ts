// From: https://weaviate.io/developers/weaviate/quickstart
// Use `quickstart-setup.ts` to create the example collection.
// To run a query, edit this file, to uncomment the line that calls the query.

import { client } from './weaviateClient.js';

const collectionName = 'Myindex';

async function listCollections() {
    const collections = await client.collections.listAll();
    console.log('Collections:');
}

// Run a fetch objects query
async function fetchObjects(collectionName: string) {
    const questionCollection = client.collections.get(collectionName);

    const response = await questionCollection.query.fetchObjects({
        limit: 1000,
    });

    return response;
}

// Run a near text query
async function nearTextQuery(collectionName: string, queryText: string) {
    const questions = client.collections.get(collectionName);

    const result = await questions.query.nearText(queryText, {
        limit: 1000,
    });

    return result;
}

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
