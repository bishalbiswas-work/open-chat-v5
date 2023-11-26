import React from "react";
import DataContext from "./DataState";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../Pages/Auth/Firebase";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import axios from "axios";
// End Firebase
const DataState = (props) => {
  // Base Url
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  // const APP_ID = "834715744964121";
  // const APP_SECRET = "2582a389247cbe3902699eea25594d1d";
  const [appID, setAppID] = useState("834715744964121");
  const [appSecret, setAppSecret] = useState(
    "2582a389247cbe3902699eea25594d1d"
  );
  // const [appID, setAppID] = useState("267736178943787");
  // const [appSecret, setAppSecret] = useState(
  //   "2cbf96cf1d16da97da365d9964d585bf"
  // );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [uid, setUid] = useState("");
  const [docId, setDocId] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  const [phoneNumber, setPhoneNumber] = useState(""); // Initialize with your default values
  const [website, setWebsite] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m MessengerGPT, ask me anything about MessengerGPT!",
    },
    {
      sender: "bot",
      text: "By the way, did you know you can have your own custom GPT connected to your messenger?",
    },
  ]);
  const [messagesLP, setMessagesLP] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m MessengerGPT, ask me anything about MessengerGPT!",
    },
    {
      sender: "bot",
      text: "By the way, did you know you can have your own custom GPT connected to your messenger?",
    },
  ]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [commonQuestions, setCommonQuestions] = useState([]);
  const [aboutBusiness, setAboutBusiness] = useState("");
  const [collectEmail, setCollectEmail] = useState(false);
  const [collectPhoneNo, setCollectPhoneNo] = useState(false);
  const [collectName, setCollectName] = useState(false);

  const [facebookToken, setFacebookToken] = useState({
    userProfileName: "",
    userProfileEmail: "",
    userId: "",
    userProfileToken: "",
    userProfileLongLiveToken: "",
    pageId: "",
    pageLongLiveToken: "",
    pageProfileImg: "",
  });
  const [facebookPages, setFacebookPages] = useState();

  const [selectedPage, setSelectedPage] = useState();
  const [messageContext, setMessageContext] = useState();
  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };
  const facebookPagesData = ({ data }) => {
    setFacebookPages(data);
  };
  const setAuthTokenFunction = ({ data }) => {
    setAuthToken(data);
    setIsLoggedIn(true);
  };
  const setUidFunction = ({ data }) => {
    setUid(data);
  };
  const setEmailFunction = ({ data }) => {
    console.log("phone number updated: ", data);
    setEmail(data);
  };
  const setNameFunction = ({ data }) => {
    console.log("phone number updated: ", data);
    setName(data);
  };
  const setPhoneNumberFunction = ({ data }) => {
    console.log("phone number updated: ", data);
    setPhoneNumber(data);
  };
  const setWebsiteFunction = ({ data }) => {
    setWebsite(data);
  };

  const setSourceUrlFunction = ({ data }) => {
    setSourceUrl(data);
  };
  const setProfileUrlFunction = ({ data }) => {
    setProfileUrl(data);
  };
  const setMessagesFunction = ({ data }) => {
    setMessages(data);
  };
  const setMessagesLPFunction = ({ data }) => {
    setMessagesLP(data);
  };
  const setQuestionsFunction = ({ data }) => {
    setQuestions(data);
  };
  const setAnswersFunction = ({ data }) => {
    setAnswers(data);
  };
  const setCommonQuestionsFunction = ({ data }) => {
    setCommonQuestions(data);
  };
  const setAboutBusinessFunction = ({ data }) => {
    setAboutBusiness(data);
  };
  const setCollectEmailFunction = ({ data }) => {
    setCollectEmail(data);
  };
  const setCollectPhoneNoFunction = ({ data }) => {
    setCollectPhoneNo(data);
  };
  const setCollectNameFunction = ({ data }) => {
    setCollectName(data);
  };
  const updateKnowledgeBase = async () => {
    // const docRef = db.collection("KnowledgeBase ").doc(uid);

    // Fetch the document
    // const docSnapshot = await docRef.get();

    // if (docSnapshot.exists) {
    // If the document exists, retrieve and print its data
    // const docData = docSnapshot.data();
    // console.log("Document data:", docData);

    // // Example: Print dummy field data
    // console.log("Dummy Field 1:", docData.dummyField1);
    // console.log("Dummy Field 2:", docData.dummyField2);
    // await docRef.setDoc({
    //   uid: uid,
    //   questions: questions,
    //   answers: answers,
    //   commonQuestion: commonQuestions,
    //   aboutBusiness: aboutBusiness,
    //   // created_time: serverTimestamp(),
    //   updated_time: serverTimestamp(),
    //   collectEmail: collectEmail,
    //   collectPhoneNo: collectPhoneNo,
    //   collectName: collectName,
    // });
    // } else {
    //   console.log("No document found with ID:", docId);
    // }
    const targetDoc = doc(db, "KnowledgeBase", uid);

    try {
      await setDoc(
        targetDoc,
        {
          uid: uid,
          questions: questions,
          answers: answers,
          commonQuestions: commonQuestions,
          aboutBusiness: aboutBusiness,
          // created_time: serverTimestamp(),
          updated_time: serverTimestamp(),
          collectEmail: collectEmail,
          collectPhoneNo: collectPhoneNo,
          collectName: collectName,
        },
        { merge: true }
      );

      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  //
  //
  //
  //
  const setFacebookUserProfileName = ({ name }) => {
    setFacebookToken((prevState) => ({
      ...prevState,
      userProfileName: name,
    }));
  };
  const setFacebookUserProfileEmail = ({ email }) => {
    setFacebookToken((prevState) => ({
      ...prevState,
      userProfileEmail: email,
    }));
  };
  const setFacebookUserID = ({ id }) => {
    setFacebookToken((prevState) => ({
      ...prevState,
      userId: id,
    }));
  };
  const setFacebookUserProfileToken = ({ token }) => {
    setFacebookToken((prevState) => ({
      ...prevState,
      userProfileToken: token,
    }));
  };
  const setFacebookUserProfileLongLiveToken = ({ token }) => {
    setFacebookToken((prevState) => ({
      ...prevState,
      userProfileLongLiveToken: token,
    }));
  };
  const setFacebookPageId = ({ id }) => {
    setFacebookToken((prevState) => ({
      ...prevState,
      pageId: id,
    }));
  };
  const setFacebookPageLongLiveToken = ({ token }) => {
    setFacebookToken((prevState) => ({
      ...prevState,
      pageLongLiveToken: token,
    }));
  };
  const setFacebookPageProfileUrl = ({ url }) => {
    setFacebookToken((prevState) => ({
      ...prevState,
      pageProfileImg: url,
    }));
  };
  const setSelectedFacebookPageDetails = ({ data }) => {
    setSelectedPage(data);
    // setSelectedPage((prevState) => ({
    //   ...prevState,
    //   pageLongLiveToken: token,
    // }));
  };
  const setMessageContextDetails = ({ data }) => {
    setMessageContext(data);
    // setSelectedPage((prevState) => ({
    //   ...prevState,
    //   pageLongLiveToken: token,
    // }));
  };
  useEffect(() => {
    console.log(facebookToken);
  }, [facebookToken]);
  const updateOrCreateFirebaseDoc = async () => {
    if (docId) {
      const targetDoc = doc(db, "LP_Visitors_Data", docId);

      try {
        await setDoc(
          targetDoc,
          {
            username: name,
            phoneNumber: phoneNumber,
            website: website,
            sourceUrl: sourceUrl,
            messages: messages,

            timestamp: serverTimestamp(),
          },
          { merge: true }
        );

        console.log("Document updated successfully");
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      try {
        const newDocRef = await addDoc(collection(db, "LP_Visitors_Data"), {
          username: name,
          phoneNumber: phoneNumber,
          website: website,
          sourceUrl: sourceUrl,
          messages: messages,
          messagesLP: messagesLP,
          timestamp: serverTimestamp(),
        });
        setDocId(newDocRef.id); // Update the docId state with the new ID

        console.log("Document created successfully with ID:", newDocRef.id);
      } catch (error) {
        console.error("Error adding new document:", error);
      }
    }
  };

  // ===================================================

  const getTrained = async ({ website, phoneNumber }) => {
    console.log("clicked");
    const getLogin = async (submitData) => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/get-access-token`,
          // "http://localhost:5000/api/get-access-token",
          submitData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response;
      } catch (err) {
        console.log(err);
      }
    };
    const submitData = {
      websiteUrl: website,
      UserPhoneNumber: phoneNumber,
      urlLevel: 2,
    };
    // const output = await getLogin(submitData);
    try {
      const output = await getLogin(submitData);
      console.log("Backend Reponse Signup: ", output);
      setAuthTokenFunction({ data: output.data.authToken });
      setUidFunction({ data: output.data.uid });
      // console.log(output.data.uid);
      // dataContext.setProfileUrlFunction({ data: output.data.profileUrl });
      setNameFunction({ data: output.data.name });
      setProfileUrlFunction({ data: output.data.faviconUrl });
      setQuestionsFunction({ data: output.data.questions });
      setAnswersFunction({ data: output.data.answers });
      setCommonQuestionsFunction({
        data: output.data.commonQuestions,
      });
      setAboutBusinessFunction({
        data: output.data.aboutBusiness,
      });
      setCollectEmailFunction({ data: output.data.collectEmail });
      setCollectPhoneNoFunction({
        data: output.data.collectPhoneNo,
      });
      setCollectNameFunction({ data: output.data.collectName });

      setDataLoaded(true);
    } catch (error) {
      console.error("There was an error with getLogin:", error);
      // Handle the error or set some state here if necessary
    }
  };

  return (
    <DataContext.Provider
      value={{
        appID,
        appSecret,
        authToken,
        uid,
        name,
        email,
        profileUrl,
        docId,
        phoneNumber,
        website,
        sourceUrl,
        messages,
        messagesLP,
        questions,
        answers,
        commonQuestions,
        aboutBusiness,
        collectEmail,
        collectPhoneNo,
        collectName,
        isLoggedIn,
        dataLoaded,
        login,
        logout,
        setProfileUrlFunction,
        setAuthTokenFunction,
        setUidFunction,
        setEmailFunction,
        setNameFunction,
        setPhoneNumberFunction,
        setWebsiteFunction,
        setSourceUrlFunction,
        setMessagesFunction,
        setMessagesLPFunction,
        setQuestionsFunction,
        setAnswersFunction,
        setCommonQuestionsFunction,
        setAboutBusinessFunction,
        setCollectEmailFunction,
        setCollectPhoneNoFunction,
        setCollectNameFunction,
        facebookToken,
        facebookPages,
        selectedPage,
        setSelectedPage,
        messageContext,
        facebookPagesData,
        setFacebookUserProfileName,
        setFacebookUserProfileEmail,
        setFacebookUserID,
        setFacebookUserProfileToken,
        setFacebookUserProfileLongLiveToken,
        setFacebookPageId,
        setFacebookPageProfileUrl,
        setFacebookPageLongLiveToken,
        setSelectedFacebookPageDetails,
        setMessageContextDetails,
        updateOrCreateFirebaseDoc,
        updateKnowledgeBase,
        getTrained,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
export default DataState;
