const axios = require("axios");
// import OpenAI from "openai";

const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});
const OPENAI_API_KEY = "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"; // Replace with your actual API key
// const PINECONE_API_KEY = "495552a4-0118-42b9-980d-ff105dcb2685";
// const PINECONE_ENVIRONMENT = "us-west4-gcp-free";

const PINECONE_API_KEY = "1849bdee-aeae-4849-8f84-52cf9e85eeef";
const PINECONE_ENVIRONMENT = "us-west4-gcp-free";

const Pinecone = require("@pinecone-database/pinecone").Pinecone;

const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
  environment: PINECONE_ENVIRONMENT,
});
const indexName = "clientknowledgebase"; // the name of your Pinecone index
const indexPinecone = pinecone.Index(indexName);

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// const pinecone = new Pinecone();
// async function initializePinecone() {
//   try {
//     await pinecone.init({
//       environment: PINECONE_ENVIRONMENT,
//       apiKey: PINECONE_API_KEY,
//     });
//     console.log("Pinecone initialized successfully!");
//   } catch (error) {
//     console.error("Error initializing Pinecone:", error);
//   }
// }

// Call the function immediately
// initializePinecone();
//

async function processText(blob, wordLimit) {
  // Remove unnecessary newlines
  let cleanedText = blob.replace(/\s*\n\s*/g, "\n").trim();

  // Split text into words
  const words = cleanedText.split(/\s+/);

  // Create chunks of text (approximately 1000 words each)
  const chunks = [];
  let currentChunk = [];

  for (const word of words) {
    currentChunk.push(word);

    if (currentChunk.length >= wordLimit) {
      chunks.push(currentChunk.join(" "));
      currentChunk = [];
    }
  }

  // Add the last chunk if it's non-empty and less than 1000 words
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(" "));
  }

  return chunks;
}
function findAndRankCommonSentences(...lists) {
  let frequencyMap = {};

  // For each list
  for (let list of lists) {
    // For each sentence in the current list
    for (let sentence of list) {
      if (frequencyMap[sentence]) {
        frequencyMap[sentence]++;
      } else {
        frequencyMap[sentence] = 1;
      }
    }
  }

  // Filter sentences that appear in all lists
  const commonSentences = Object.keys(frequencyMap).filter(
    (sentence) => frequencyMap[sentence] === lists.length
  );

  // Sort by frequency
  const sortedCommonSentences = commonSentences.sort(
    (a, b) => frequencyMap[b] - frequencyMap[a]
  );

  return sortedCommonSentences;
}

async function getEmbeddings(text) {
  // OpenAI's Embedding model dimensions were reduced from 12288 to 1536.
  const endpoint = "https://api.openai.com/v1/embeddings";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };
  const data = {
    input: text,
    model: "text-embedding-ada-002",
  };

  try {
    const response = await axios.post(endpoint, data, { headers: headers });

    // Extract the embedding array
    if (
      response.data &&
      response.data.data &&
      response.data.data[0] &&
      response.data.data[0].embedding
    ) {
      return response.data.data[0].embedding;
    } else {
      throw new Error("Embedding array not found in response.");
    }
  } catch (error) {
    console.error("Error fetching embeddings:", error);
    throw error;
  }
}

async function removeSensitiveDataAndSummarize(content) {
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };
  // const data = {
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "system",
  //       content: "You are a helpful assistant.",
  //     },
  //     {
  //       role: "user",
  //       content: `Remove any sensitive data from given content and summarize it for easy understanding:  ${content} `,
  //     },
  //   ],
  // };
  // const data = {
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "system",
  //       content:
  //         "You are a helpful assistant. Your main goal is to extract only the essential information from a given content, removing any conversational or sensitive data or personal data.",
  //     },
  //     {
  //       role: "user",
  //       content: `Given this content, provide a concise summary without any conversational elements: ${content}`,
  //     },
  //   ],
  // };
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. from this  conversation, conclude only the main policies about the business written in form of FAQ to add to the business website..",
      },
      {
        role: "user",
        content: `Given this content, from this  conversation, conclude only the main policies about the business written in form of FAQ to add to the business website.: ${content}`,
      },
    ],
  };
  try {
    const response = await axios.post(endpoint, data, { headers: headers });
    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content;
    } else {
      throw new Error("No content returned from OpenAI");
    }
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    throw error;
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////

async function extractQAFromParagraph(paragraph) {
  const prompt = `Extract questions and answers from the following paragraph: ${paragraph}`;

  // Define the JSON Schema
  const schema = {
    type: "object",
    properties: {
      questions: {
        type: "array",
        items: { type: "string" },
        description: "The extracted questions from the paragraph",
      },
      answers: {
        type: "array",
        items: { type: "string" },
        description: "The extracted answers corresponding to the questions",
      },
    },
    required: ["questions", "answers"],
  };

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        { role: "system", content: "You are a knowledgeable assistant." },
        { role: "user", content: prompt },
      ],
      functions: [{ name: "extract_qa", parameters: schema }],
      function_call: { name: "extract_qa" },
    });

    const message = completion.choices?.[0]?.message;

    if (message && message.function_call && message.function_call.arguments) {
      // return JSON.stringify(message.function_call.arguments);
      if (typeof message.function_call.arguments === "string") {
        return JSON.parse(message.function_call.arguments);
      } else {
        return message.function_call.arguments;
      }
    } else {
      throw new Error("Unexpected structure inside 'message'");
    }
  } catch (error) {
    console.error("Error during extraction:", error);
    throw error; // propagate the error up, so the caller can handle or catch it
  }
}

function generateListStringQA(questions, answers, groupSize) {
  if (questions.length !== answers.length) {
    throw new Error("Mismatched question-answer pairs!");
  }

  const groupedStrings = [];

  for (let i = 0; i < questions.length; i += groupSize) {
    let combinedQA = "";

    for (let j = i; j < i + groupSize && j < questions.length; j++) {
      combinedQA += `Q: ${questions[j]}\nA: ${answers[j]}\n\n`;
    }

    groupedStrings.push(combinedQA);
  }

  return groupedStrings;
}
///////////////////////////////////////////////////////////////////////////////////////////////////

async function getAnswer(
  content,
  lastMsg,
  secondLastMsg,
  thirdLastMsg,
  fourthLastMsg
) {
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };
  // const data = {
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "system",
  //       content: "You are a helpful assistant chat bot.",
  //     },
  //     {
  //       role: "user",
  //       content: `This is information gather from differect sources like chats and website. Use this context for only information :  ${content} and provide a positive, polite answer to this question : ${prompt}`,
  //     },
  //   ],
  // };
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Use the following background information for context but focus on the user's main question.",
      },
      {
        role: "user",
        content: `Context:  ${content}  -------End of context---------`,
      },
      {
        role: "user",
        content: `Provide a positive, polite answer to this question : ${fourthLastMsg}`,
      },
      {
        role: "user",
        content: `Provide a positive, polite answer to this question : ${thirdLastMsg}`,
      },
      {
        role: "user",
        content: `Provide a positive, polite answer to this question : ${secondLastMsg}`,
      },
      {
        role: "user",
        content: `Provide a positive, polite answer to this question : ${lastMsg}`,
      },
    ],
  };

  try {
    const response = await axios.post(endpoint, data, { headers: headers });
    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content;
    } else {
      throw new Error("No content returned from OpenAI");
    }
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    throw error;
  }
}
// async function createVectors(indexName, textList) {
//   // Initialize Pinecone client

//   // Get list of indexes
//   const indexes = await pinecone.listIndexes();

//   // Delete existing indexes
//   if (indexes.length > 0) {
//     for (const index of indexes) {
//       // console.log(index);
//       await pinecone.deleteIndex(index.name);
//     }
//   }
//   // Create a new index with the provided name
//   await pinecone.createIndex({
//     name: indexName,
//     dimension: 1536,
//     metric: "cosine",
//   });

//   let processedCount = 0;
//   for (const text of textList) {
//     const vector = await getEmbeddings(text); // Assuming getEmbeddings returns a vector

//     const records = {
//       id: processedCount,
//       values: vector,
//       metadata: { context: text },
//     };
//     // Upsert the vector into the index with the text as the item ID or key
//     // await pinecone.upsert(indexName, { item: text, vector: vector });
//     const index = pinecone.index(indexName);
//     await index.upsert(records);
//     await delay(300);
//     processedCount++;
//   }

//   return processedCount;
// }
async function createVectors(uid, textList) {
  // Initialize Pinecone client

  // Get list of indexes
  // const indexes = await pinecone.listIndexes();

  // Delete existing indexes
  // console.log(indexes);
  // if (indexes.length > 0) {
  //   for (const index of indexes) {
  //     // console.log(index);
  //     await pinecone.deleteIndex(index.name);
  //   }
  // }
  // const existingIndex = indexes.find((index) => index.name === indexName);

  // if (existingIndex) {
  //   // If the index exists, delete it
  //   await pinecone.deleteIndex(indexName);
  //   console.log(`Deleted existing index: ${indexName}`);
  // }
  // // Create a new index with the provided name
  // await pinecone.createIndex({
  //   name: indexName,
  //   dimension: 1536,
  //   metric: "euclidean",
  // });
  // await delay(60000);

  let processedCount = 0;
  const batchSize = 2; // Number of messages to insert at a time
  const totalBatches = Math.ceil(textList.length / batchSize);

  for (let batch = 0; batch < totalBatches; batch++) {
    const records = [];

    for (let i = 0; i < batchSize; i++) {
      const index = batch * batchSize + i;
      if (index < textList.length) {
        // const text = textList[index];

        const text = await removeSensitiveDataAndSummarize(textList[index]);
        const vector = await getEmbeddings(text);

        records.push({
          id: index.toString(),
          values: vector,
          metadata: { context: text },
        });
      }
    }

    // Insert the batch of records into Pinecone
    const ns1 = indexPinecone.namespace(uid);
    // const index = pinecone.index(indexName);
    console.log(records);
    // await vectorIndex.upsert(records);
    await ns1.upsert(records);
    await delay(1000);

    processedCount += records.length;
  }

  return processedCount;
}

async function createVectors2(uid, questionList, answerList) {
  // Initialize Pinecone client
  // const indexName = "clientknowledgebase";
  // Get list of indexes
  // const indexes = await pinecone.listIndexes();

  // Delete existing indexes
  // console.log(indexes);
  // if (indexes.length > 0) {
  //   for (const index of indexes) {
  //     // console.log(index);
  //     await pinecone.deleteIndex(index.name);
  //   }
  // }
  // const existingIndex = indexes.find((index) => index.name === indexName);

  // if (existingIndex) {
  //   // If the index exists, delete it
  //   await pinecone.deleteIndex(indexName);
  //   console.log(`Deleted existing index: ${indexName}`);
  // }
  // // Create a new index with the provided name
  // await pinecone.createIndex({
  //   name: indexName,
  //   dimension: 1536,
  //   metric: "euclidean",
  // });
  // await delay(30000);

  let processedCount = 0;
  const batchSize = 10; // Number of messages to insert at a time
  const totalBatches = Math.ceil(questionList.length / batchSize);

  for (let batch = 0; batch < totalBatches; batch++) {
    const records = [];

    for (let i = 0; i < batchSize; i++) {
      const index = batch * batchSize + i;
      if (index < questionList.length) {
        // const text = textList[index];

        // const text = await removeSensitiveDataAndSummarize(textList[index]);
        const text = `Question: ${questionList[index]}     Answer: ${answerList[index]}`;
        const vector = await getEmbeddings(text);

        records.push({
          id: index.toString(),
          values: vector,
          metadata: { context: text, uid: uid },
        });
      }
    }

    // Insert the batch of records into Pinecone
    // const index = pinecone.index(indexName);
    // console.log(records);
    const ns1 = indexPinecone.namespace(uid);

    // await vectorIndex.upsert(records);
    await ns1.upsert(records);
    await delay(500);

    processedCount += records.length;
  }

  return processedCount;
}
async function vectorExists(indexName) {
  try {
    const allIndexes = await pinecone.listIndexes();

    for (let index of allIndexes) {
      if (index.name === indexName) {
        const stats = await pinecone.describeIndex(indexName); // Assuming getStats() fetches stats of an index
        return {
          exists: true,
          // vectorsCount: stats.vectorCount, // Assuming vectorCount property gives number of vectors
        };
      }
    }
    return {
      exists: false,
      vectorsCount: 0,
    };
  } catch (error) {
    console.error("Error fetching index details:", error);
    throw error;
  }
}
async function namespaceExists(namespaceName) {
  try {
    const allNamespaces = await pinecone.listNamespaces(); // Assuming listNamespaces() fetches all namespaces

    for (let ns of allNamespaces) {
      if (ns.name === namespaceName) {
        // No need to describe namespace in this context, assuming existence check is enough
        return {
          exists: true,
        };
      }
    }
    return {
      exists: false,
    };
  } catch (error) {
    console.error("Error fetching namespace details:", error);
    throw error;
  }
}

async function processQuery(
  uid,
  lastMsg,
  secondLastMsg,
  thirdLastMsg,
  fourthLastMsg
) {
  try {
    // 1. Convert text to its embedding vector
    const embedding = await getEmbeddings(lastMsg);

    // 2. Search for matching vectors in Pinecone

    const index = pinecone.index(uid);

    // query in default namespace
    delay(1000);

    const searchResults = await index.query({
      topK: 4,
      vector: embedding,
      includeMetadata: true,
    });

    // console.log(searchResults[0].metadata);
    // return searchResults.matches.map((match) => match.metadata);
    // function extractContexts(data) {
    const data = searchResults.matches.map((match) => match.metadata.context);
    // }

    // // 3. Extract the metadata and context of the matches
    let finalContext = "";
    for (let result of data) {
      finalContext += result + " ";
    }
    // console.log(finalContext);
    // // 4 & 5. Send the concatenated context to getAnswer
    const answer = await getAnswer(
      finalContext,
      lastMsg,
      secondLastMsg,
      thirdLastMsg,
      fourthLastMsg
    );

    // const answer = "";
    // 6. Return the response
    return answer;
  } catch (error) {
    console.error("Error processing query:", error);
    throw error;
  }
}

async function processQuery2(
  uid,
  lastMsg,
  secondLastMsg,
  thirdLastMsg,
  fourthLastMsg
) {
  // const indexName = "clientknowledgebase";

  try {
    // 1. Convert text to its embedding vector
    const embedding = await getEmbeddings(lastMsg);

    // 2. Search for matching vectors in Pinecone

    // const index = pinecone.index(indexName);
    const ns1 = indexPinecone.namespace(uid);

    // query in default namespace
    delay(1000);

    const searchResults = await ns1.query({
      topK: 10,
      vector: embedding,
      // filter: { uid: uid },

      includeMetadata: true,
    });

    // console.log(searchResults[0].metadata);
    // return searchResults.matches.map((match) => match.metadata);
    // function extractContexts(data) {
    const data = searchResults.matches.map((match) => match.metadata.context);
    // }

    // // 3. Extract the metadata and context of the matches
    let finalContext = "";
    for (let result of data) {
      finalContext += result + " ";
    }
    console.log("Context for Vector: ", finalContext);
    // // 4 & 5. Send the concatenated context to getAnswer
    const answer = await getAnswer(
      finalContext,
      lastMsg,
      secondLastMsg,
      thirdLastMsg,
      fourthLastMsg
    );

    // const answer = "";
    // 6. Return the response
    return answer;
  } catch (error) {
    console.error("Error processing query:", error);
    throw error;
  }
}
module.exports = {
  processText,
  extractQAFromParagraph,
  generateListStringQA,
  getEmbeddings,
  createVectors,
  createVectors2,
  removeSensitiveDataAndSummarize,
  vectorExists,
  processQuery,
  processQuery2,
  findAndRankCommonSentences,
};
