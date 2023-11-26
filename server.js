// const { admin } = require("./auth/firebaseConfig"); // Your firebase configuration
// const { facebookSDK } = require("./auth/facebookConfig"); // Your facebook SDK configuration
const {
  getLongLivedToken,
  getPageAccessToken,
  getPageData,
  fetchAndCleanFacebookMessages,
} = require("./auth/facebookConfig");
const {
  extractDomainName,
  fetchFavicon,
  getContentAndUrl,
  determineURLFormat,
} = require("./auth/webScrape");
const {
  createVectors,
  createVectors2,
  vectorExists,
  processQuery,
  processQuery2,
  generateListStringQA,
  processText,
  findAndRankCommonSentences,
  removeSensitiveDataAndSummarize,
  extractQAFromParagraph,
} = require("./auth/openAi");

//
//
//
var admin = require("firebase-admin");
var serviceAccount = require("./auth/messangergpt-firebase-adminsdk-b3qv7-42edd05227.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firestore = admin.firestore();

//
const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// App inisilizaton
const app = express();
// app.use(bodyParser.json());
app.use(express.json());

// Load environment variables
// require("dotenv").config();
// // Set up CORS
// const whitelist = ["http://localhost:3000"]; // Your React app's location in development
// if (process.env.NODE_ENV === "production") {
//   whitelist.push("http://localhost:5000");
//   whitelist.push("https://open-chat.pro");
//   whitelist.push("https://www.open-chat.pro"); // Add both production frontends' domains
// }

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions));

const whitelist = [
  "http://localhost:3000", // React app's location in development
  "http://localhost:5000", // Optional: If you have another service running in production on this port
  "https://open-chat.pro", // Production frontend domain
  "https://www.open-chat.pro", // Production frontend domain with www
  "https://betimeful.life",
  "https://www.betimeful.life",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const PORT = process.env.PORT || 5000;
const SECRET_KEY =
  "t3klbsukjuecvzw61wllwxigltinwiz0v10duhkbjy35ws8h4zpobrmmgs5d2c9k0dye5nzav6evrv0f3xazib5l2g6lzpr0wixcj4r17j75otly007ib9dynzls7efwr8ln48jn49q7jlsw5i1htu";
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// 1. get-access-token

app.post("/api/get-access-token", async (req, res) => {
  try {
    // let facebookUserId = req.body.facebookUserId;
    // let facebookPageId = req.body.facebookPageId;
    // let facebookShortLiveToken = req.body.facebookShortLiveToken;

    let websiteUrl = req.body.websiteUrl;
    let UserPhoneNumber = req.body.UserPhoneNumber;
    let urlLevel = req.body.urlLevel;
    console.log(websiteUrl, UserPhoneNumber, urlLevel);

    let userSnapshot = "";
    // let userSnapshot = await firestore
    //   .collection("Users2")
    //   .where("UserPhoneNumber", "==", UserPhoneNumber)
    //   .get();

    let uid, created_time, firebaseToken, name, faviconUrl;

    // if (!userSnapshot.empty) {
    if (false) {
      // User exists in our collection
      let userDoc = userSnapshot.docs[0];
      uid = userDoc.id; // Document ID serves as uid
      created_time = userDoc.data().created_time; // Fetch the original creation time
      firebaseToken = userDoc.data().authToken;
      name = userDoc.data().name;
      faviconUrl = userDoc.data().faviconUrl;
      websiteUrl = userDoc.data().websiteUrl;
      console.log("User Exist");
    } else {
      // New user, create a new uid and set created time
      uid = crypto.randomBytes(16).toString("hex");
      created_time = admin.firestore.FieldValue.serverTimestamp();
      console.log("User Not Exist");
      // let firebaseToken = await admin.auth().createCustomToken(uid);
      const payload = { uid: uid };
      const options = { expiresIn: "60d" }; // 60 days expiration

      firebaseToken = jwt.sign(payload, SECRET_KEY, options);
      name = await extractDomainName(websiteUrl);
      faviconUrl = await fetchFavicon(websiteUrl);

      let userRef = firestore.collection("Users2").doc(uid);
      await userRef.set(
        {
          uid: uid,

          // facebookPageId: facebookPageId,
          // facebookUserId: facebookUserId, // Always ensure the facebookId is present or updated
          authToken: firebaseToken,
          name: name,
          urlLevel: urlLevel,
          websiteUrl: websiteUrl,
          UserPhoneNumber: UserPhoneNumber,
          faviconUrl: faviconUrl,
          // UserShortLiveToken: facebookShortLiveToken,
          // UserLongLiveToken: longLiveToken,
          // pageAccessToken: pageAccessToken,
          created_time: created_time,
          updated_time: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    // let longLiveToken = await getLongLivedToken(facebookShortLiveToken);
    // let pageAccessToken = await getPageAccessToken(
    //   facebookUserId,
    //   longLiveToken
    // );
    // For simplicity, I'm using static tokens. In a real scenario, you'd fetch them dynamically.
    // let longLiveToken = "test long live token";
    // let pageAccessToken = "test page token";
    // Generate a unique name for the favicon

    // let vectorStatus = await vectorExists(uid);
    // let vectorStatus = false;
    // if (!vectorStatus.exists) {
    if (true) {
      console.log("Vector Not Exist");

      // let messages = await fetchAndCleanFacebookMessages(
      //   pageAccessToken,
      //   facebookPageId
      // );
      let websiteContent = await getContentAndUrl(websiteUrl, 25, urlLevel);
      let processedContent = await processText(
        websiteContent.allAccumulatedContents,
        1000
      );
      console.log(processedContent);
      // const vectorLength = await createVectors(uid, processedContent);
      let all_data = {
        questions: [],
        answers: [],
      };
      console.log("success");
      for (let i = 0; i < processedContent.length; i++) {
        let cleandata = await removeSensitiveDataAndSummarize(
          processedContent[i]
        );
        console.log(cleandata);
        let response = await extractQAFromParagraph(cleandata);

        // Assuming the response is a JSON object with questions and answers properties
        all_data.questions.push(...response.questions); // spread syntax to push individual questions
        all_data.answers.push(...response.answers); // spread syntax to push individual answers
      }
      const vectorLength = await createVectors2(
        uid,
        all_data.questions,
        all_data.answers
      );

      let common_q = findAndRankCommonSentences(all_data.questions);
      const docRef = firestore.collection("KnowledgeBase").doc(uid);

      // Check if the document exists
      const docSnapshot = await docRef.get();
      if (docSnapshot.exists) {
        await docRef.delete();
      }
      // Create (or recreate) the document with dummy data
      await docRef.set({
        uid: uid,
        questions: all_data.questions,
        answers: all_data.answers,
        commonQuestions: common_q,
        aboutBusiness: "",
        created_time: admin.firestore.FieldValue.serverTimestamp(),
        updated_time: admin.firestore.FieldValue.serverTimestamp(),
        collectEmail: false,
        collectPhoneNo: false,
        collectName: false,
      });
      res.json({
        uid: uid,
        name: name,
        message: "Success",
        authToken: firebaseToken,
        faviconUrl: faviconUrl,
        websiteUrl: websiteUrl,
        urlLevel: urlLevel,
        vectorLength: vectorLength,
        questions: all_data.questions,
        answers: all_data.answers,
        commonQuestions: common_q,
        aboutBusiness: "",
        collectEmail: false,
        collectPhoneNo: false,
        collectName: false,
      });
    } else {
      console.log("Vector Exist");

      const docRef = firestore.collection("KnowledgeBase").doc(uid);

      let questions = [];
      let answers = [];
      let businessInfo = "";
      let commonQuestions = [];
      let collectEmail, collectPhoneNo, collectName;

      const docSnapshot = await docRef.get();
      if (docSnapshot.exists) {
        console.log("Vector Doc exist");
        console.log(docSnapshot.data());

        const docData = docSnapshot.data();
        questions = docData.questions;
        answers = docData.answers;
        businessInfo = docData.aboutBusiness;
        commonQuestions = docData.commonQuestions;
        collectEmail = docData.collectEmail;
        collectPhoneNo = docData.collectPhoneNo;
        collectName = docData.collectName;
      } else {
        console.log("Vector Doc not exist");

        questions = [];
        answers = [];
        businessInfo = "";
        commonQuestions = [];
        collectEmail = false;
        collectPhoneNo = false;
        collectName = false;
      }
      // console.log(
      //   questions,
      //   answers,
      //   businessInfo,
      //   commonQuestions,
      //   collectEmail,
      //   collectPhoneNo,
      //   collectName
      // );
      console.log("AuthToken : ", firebaseToken);
      res.json({
        uid: uid,
        name: name,
        message: "Success",
        authToken: firebaseToken,
        faviconUrl: faviconUrl,
        websiteUrl: websiteUrl,
        urlLevel: urlLevel,
        vectorLength: -1,
        questions: questions,
        answers: answers,
        aboutBusiness: businessInfo,
        commonQuestions: commonQuestions,
        collectEmail: collectEmail,
        collectPhoneNo: collectPhoneNo,
        collectName: collectName,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/update-knowledge", async (req, res) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res.status(403).json({ error: "Unauthorized request" });
    }

    const accessToken = bearerToken.split("Bearer ")[1];

    // Verify the token using the secret key
    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, SECRET_KEY);
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const uid = decodedToken.uid; // Assuming the UID is stored in the token payload
    const questions = req.body.questions;
    const answers = req.body.answers;
    let commonQuestions = [];
    const aboutBusiness = req.body.aboutBusiness;
    let collectEmail = req.body.collectEmail;
    let collectPhoneNo = req.body.collectPhoneNo;
    let collectName = req.body.collectName;
    let createdtime;

    commonQuestions = findAndRankCommonSentences(questions);
    const listQuestionAndAnswer = generateListStringQA(questions, answers, 10);
    const vectorLength = await createVectors(uid, listQuestionAndAnswer);

    const docRef = firestore.collection("KnowledgeBase").doc(uid);

    // Check if the document exists
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      const docData = docSnapshot.data();
      createdtime = docData.created_time;
      // collectEmail = docData.collectEmail;
      // collectPhoneNo = docData.collectPhoneNo;
      // collectName = docData.collectName;
      await docRef.delete();
    } else {
      createdtime = admin.firestore.FieldValue.serverTimestamp();
    }
    // Create (or recreate) the document with dummy data
    await docRef.set({
      uid: uid,
      questions: questions,
      answers: answers,
      commonQuestions: commonQuestions,
      aboutBusiness: aboutBusiness,
      collectEmail: collectEmail,
      collectPhoneNo: collectPhoneNo,
      collectName: collectName,
      // created_time: createdtime,
      updated_time: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json({
      uid: uid,
      message: "Success",
      vectorLength: vectorLength,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================================================
//                    Start Chec Url
// ========================================================

app.post("/api/check-url", async (req, res) => {
  try {
    console.log(req.body);
    let url = req.body.url;
    let response = await determineURLFormat(url);
    console.log(response);

    let rootUrl, status;
    if (response) {
      rootUrl = response;
      status = true;
    } else {
      rootUrl = response;
      status = false;
    }
    res.json({
      rootUrl: rootUrl,
      status: status,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ========================================================
//                    End Chec Url
// ========================================================
// 2. initiate-fetch
app.post("/api/initiate-fetch", async (req, res) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res.status(403).json({ error: "Unauthorized request" });
    }

    const accessToken = bearerToken.split("Bearer ")[1];

    // Verify the token using the secret key
    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, SECRET_KEY);
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const uid = decodedToken.uid; // Assuming the UID is stored in the token payload

    let name = req.body.name;
    let website = req.body.website;
    let profile_url = req.body.profile_url;
    let owner_emails = req.body.owner_emails;

    let pageRef = firestore.collection("PagesData").doc(uid);

    const existingDoc = await pageRef.get();
    let created_time;
    if (existingDoc.exists) {
      created_time = existingDoc.data().created_time;
    } else {
      created_time = admin.firestore.FieldValue.serverTimestamp();
    }

    await pageRef.set({
      uid: uid,
      name: name,
      website: website,
      profile_url: profile_url,
      owner_emails: owner_emails,
      created_time: created_time,
      updated_time: admin.firestore.FieldValue.serverTimestamp(),
    });
    let pageRef2 = firestore.collection("Users").doc(uid);
    const existingDoc2 = await pageRef2.get();
    let pageAccessToken = "";
    let facebookPageId = "";
    if (existingDoc2.exists) {
      pageAccessToken = existingDoc2.data().pageAccessToken;
      facebookPageId = existingDoc2.data().facebookPageId;
    } else {
      res.json({ message: "User not found!" });
    }
    // Train Model
    let messages = await fetchAndCleanFacebookMessages(
      pageAccessToken,
      facebookPageId
    );
    let vectorLength = await createVectors(uid, messages);
    res.json({
      message: "Success",
      vectorLength: vectorLength,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. initiate-fetch
app.post("/api/retrain", async (req, res) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res.status(403).json({ error: "Unauthorized request" });
    }

    const accessToken = bearerToken.split("Bearer ")[1];

    // Verify the token using the secret key
    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, SECRET_KEY);
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const uid = decodedToken.uid; // Assuming the UID is stored in the token payload

    let pageRef2 = firestore.collection("Users").doc(uid);
    const existingDoc2 = await pageRef2.get();
    let pageAccessToken = "";
    let facebookPageId = "";
    if (existingDoc2.exists) {
      pageAccessToken = existingDoc2.data().pageAccessToken;
      facebookPageId = existingDoc2.data().facebookPageId;
    } else {
      res.json({ message: "User not found!" });
    }
    // Train Model
    let messages = await fetchAndCleanFacebookMessages(
      pageAccessToken,
      facebookPageId
    );
    let vectorLength = await createVectors(uid, messages);
    res.json({
      message: "Success",
      vectorLength: vectorLength,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. get-response
app.post("/api/get-response", async (req, res) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res.status(403).json({ error: "Unauthorized request" });
    }

    const accessToken = bearerToken.split("Bearer ")[1];

    // Verify the token using the secret key
    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, SECRET_KEY);
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const uid = decodedToken.uid; // Assuming the UID is stored in the token payload

    // Get Response
    // let response = await getResponse(uid, req.body.userQuestion);
    let response = await processQuery2(
      uid,
      req.body.userQuestion,

      req.body.secondLastMsg,
      req.body.thirdLastMsg,
      req.body.fourthLastMsg
    );
    // let response = "hello world " + req.body.userQuestion;
    res.json({ response: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/get-response-self", async (req, res) => {
  try {
    // const bearerToken = req.headers.authorization;
    // if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    //   return res.status(403).json({ error: "Unauthorized request" });
    // }

    // const accessToken = bearerToken.split("Bearer ")[1];

    // // Verify the token using the secret key
    // let decodedToken;
    // try {
    //   decodedToken = jwt.verify(accessToken, SECRET_KEY);
    // } catch (err) {
    //   return res.status(403).json({ error: "Invalid token" });
    // }

    const uid = "messengergptvector"; // Assuming the UID is stored in the token payload

    // Get Response
    // let response = await getResponse(uid, req.body.userQuestion);
    let response = await processQuery(
      uid,
      req.body.userQuestion,

      req.body.secondLastMsg,
      req.body.thirdLastMsg,
      req.body.fourthLastMsg
    );
    // let response = "hello world " + req.body.userQuestion;
    res.json({ response: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});
