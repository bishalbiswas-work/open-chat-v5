// facebookConfig.js
const axios = require("axios");
const fs = require("fs");

const APP_ID = "834715744964121";
const APP_SECRET = "2582a389247cbe3902699eea25594d1d";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function getLongLivedToken(SHORT_LIVED_TOKEN) {
  const endpoint = `https://graph.facebook.com/v12.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${SHORT_LIVED_TOKEN}`;

  const response = await axios.get(endpoint);
  return response.data.access_token;
}

async function getPageAccessToken(facebookId, longLivedToken) {
  const pageAccessTokenEndpoint = `https://graph.facebook.com/v12.0/${facebookId}/accounts?access_token=${longLivedToken}`;

  const response = await axios.get(pageAccessTokenEndpoint);

  // Assuming the user has a page, and you want the token of the first page
  return response.data.data[0].access_token;
}
async function getPageData(pageId, pageAccessToken) {
  const fields = "id,name,about,website,category,picture,emails"; // Add any other fields you want
  const pageDataEndpoint = `https://graph.facebook.com/v12.0/${pageId}?fields=${fields}&access_token=${pageAccessToken}`;

  const response = await axios.get(pageDataEndpoint);
  return response.data;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
async function getFacebookPageConversationIDs(accessToken, pageId) {
  let conversationIds = [];
  // let url = `https://graph.facebook.com/v13.0/${pageId}/conversations?access_token=${accessToken}`;
  let url = `https://graph.facebook.com/v13.0/${pageId}/conversations?platform=messenger&access_token=${accessToken}`;

  while (url) {
    try {
      const response = await axios.get(url);
      const ids = response.data.data.map((conversation) => conversation.id);
      conversationIds.push(...ids);

      url = response.data.paging && response.data.paging.next;
    } catch (error) {
      console.error("Error fetching conversation IDs:", error);
      break;
    }
    await delay(500);
  }
  console.log(conversationIds);
  return conversationIds;
}

async function getMessagesFromConversationID(accessToken, conversationId) {
  let messagesList = [];
  // let url = `https://graph.facebook.com/v13.0/${conversationId}/messages?access_token=${accessToken}`;
  let url = `https://graph.facebook.com/v13.0/${conversationId}/messages?fields=id,message,from,created_time&access_token=${accessToken}`;

  while (url) {
    try {
      const response = await axios.get(url);
      const messages = response.data.data.map((message) => message.message);
      messagesList.push(...messages);

      url = response.data.paging && response.data.paging.next;
    } catch (error) {
      console.error("Error fetching messages:", error);
      break;
    }
    await delay(500);
  }
  // console.log(messagesList);
  return messagesList;
}

async function fetchAndCleanFacebookMessages(accessToken, pageId) {
  const conversationIds = await getFacebookPageConversationIDs(
    accessToken,
    pageId
  );
  let allMessages = [];

  for (let id of conversationIds) {
    const messages = await getMessagesFromConversationID(accessToken, id);
    allMessages.push(...messages);
  }

  allMessages = allMessages.map((message) => {
    return message
      .replace(/[{}[\]"\\]/g, "") // Remove JSON special characters
      .replace(/'/g, "") // Remove apostrophes
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim(); // Trim starting and ending spaces
  });

  // Aggregate cleaned messages into chunks of ~1000 words
  const chunks = [];
  let currentChunkText = "";

  allMessages.forEach((message) => {
    const combinedText = currentChunkText + " " + message;

    if (combinedText.split(" ").length >= 1000) {
      chunks.push(combinedText.trim());
      currentChunkText = "";
    } else {
      currentChunkText = combinedText;
    }
  });
  // Add the last chunk if it contains any text
  if (currentChunkText.trim().length > 0) {
    chunks.push(currentChunkText.trim());
  }

  return chunks;
}

module.exports = {
  getLongLivedToken,
  getPageAccessToken,
  getPageData,
  getFacebookPageConversationIDs,
  getMessagesFromConversationID,
  fetchAndCleanFacebookMessages,
};
