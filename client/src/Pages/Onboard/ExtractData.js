import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Visual Imports
import PropTypes from "prop-types";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Grid, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
// import LinearProgress from "@mui/material/LinearProgress";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

import Button from "@mui/material/Button";
// End of Visual Imports

import { useJwt } from "react-jwt";

// API Imports
import axios from "axios";
// ContextAPI
import { useContext } from "react";
import DataContext from "../../ContextAPI/DataState";
// ContentAPI End

const ExtractData = () => {
  // Base Url
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  //
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const [progress, setProgress] = React.useState(1);

  const texts = [
    "Fetching the magic for you! ✨",
    "Diving deep into the digital realm... 🌐",
    "Crafting your personalized experience... 🛠️",
    "Hold tight! Greatness is unfolding... 🚀",
    "Almost there! Can you feel the excitement? 🎉",
    "Revolutionizing your digital journey... ⏳",
    "Sculpting the perfect interface just for you! 🎨",
    "Bringing out the best from the web... 🕸️",
    "Stay tuned! Wonders are on their way... 💡",
    "Your tailored experience is moments away... ⏰",
  ]; // Add more texts as required
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // Change interval as needed

    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 1 : prevProgress + 1
      );
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const [conversations, setConversations] = useState([]);
  const [textBlob, setTextBlob] = useState("");
  const [state, setstate] = useState(false);
  const [error, setError] = useState(false);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
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
  // const fetchPages = async (token) => {
  //   try {
  //     const response = await fetch(
  //       `https://graph.facebook.com/v13.0/me/accounts?access_token=${token}`
  //     );
  //     const data = await response.json();
  //     return data.data[0].id;
  //   } catch (error) {
  //     console.error("Error fetching pages:", error);
  //   }
  // };
  const handleLoad = async () => {
    console.log("clicked");
    // const pageId = await fetchPages(dataContext.facebookToken.userProfileToken);
    // dataContext.setFacebookPageId({ id: pageId });
    // const submitData = {
    //   facebookUserId: dataContext.facebookToken.userId,
    //   facebookPageId: pageId,
    //   facebookShortLiveToken: dataContext.facebookToken.userProfileToken,
    // };
    const submitData = {
      websiteUrl: dataContext.website,
      UserPhoneNumber: dataContext.phoneNumber,
      urlLevel: 2,
    };
    // const output = await getLogin(submitData);
    try {
      const output = await getLogin(submitData);
      console.log("Backend Reponse Signup: ", output);
      dataContext.setAuthTokenFunction({ data: output.data.authToken });
      dataContext.setUidFunction({ data: output.data.uid });
      // console.log(output.data.uid);
      // dataContext.setProfileUrlFunction({ data: output.data.profileUrl });
      dataContext.setNameFunction({ data: output.data.name });
      dataContext.setProfileUrlFunction({ data: output.data.faviconUrl });
      dataContext.setQuestionsFunction({ data: output.data.questions });
      dataContext.setAnswersFunction({ data: output.data.answers });
      dataContext.setCommonQuestionsFunction({
        data: output.data.commonQuestions,
      });
      dataContext.setAboutBusinessFunction({ data: output.data.aboutBusiness });
      dataContext.setCollectEmailFunction({ data: output.data.collectEmail });
      dataContext.setCollectPhoneNoFunction({
        data: output.data.collectPhoneNo,
      });
      dataContext.setCollectNameFunction({ data: output.data.collectName });
      delay(2000);
      navigate("/dashboard/chat");
    } catch (error) {
      setstate(false);
      console.error("There was an error with getLogin:", error);
      // Handle the error or set some state here if necessary
    }

    // try {
    //   // Verify and decode the JWT token
    //   // const decoded = jwt.decode(output.data.authToken);
    //   const { decodedToken, isExpired } = useJwt(output.data.authToken);
    //   // Check if the decoded token contains a UID field
    //   if (decodedToken) {
    //     dataContext.setUidFunction({ data: decodedToken });
    //     console.log("UID: ", decodedToken);
    //   } else {
    //     // Token doesn't contain a UID field or is invalid
    //     return null;
    //   }
    // } catch (error) {
    //   // Token is invalid or couldn't be decoded
    //   console.error("Error decoding JWT token:", error);
    //   return null;
    // }
  };
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   setstate(true);
  //   handleLoad();
  // });

  useEffect(() => {
    if (dataContext.dataLoaded) {
      setProgress(100);
      delay(2000).then(() => {
        navigate("/dashboard/chat");
      });
    }
  }, [dataContext.dataLoaded]);
  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        {/* Display Text */}

        {state ? (
          <Typography variant="h6">{texts[index]}</Typography>
        ) : (
          <div>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                variant="h6"
                style={{ marginLeft: "10px", fontSize: "0.9rem" }}
              >
                <span style={{ color: "gray" }}>Almost There!</span>
              </Typography>
            </Box>
            <Box height={25}></Box>

            <Box textAlign="center" sx={{ width: "400px" }}>
              <Typography
                variant="h6"
                style={{ marginLeft: "18px", fontSize: "18px" }}
              >
                Let's Fetch!
              </Typography>
            </Box>
            <Box height={25}></Box>

            <Box display="flex" justifyContent="center" alignItems="center">
              <Box sx={{ width: "400px" }}>
                <Typography
                  variant="h6"
                  style={{
                    marginLeft: "10px",
                    fontSize: "0.9rem",
                    color: "grey",
                  }}
                >
                  {/* <span style={{ color: "grey", fontWeight: 400 }}>
                    By fetching your Facebook page messages, we can craft a
                    custom bot tailored just for your business. It'll be trained
                    to answer questions specific to your brand, ensuring each
                    customer interaction is both meaningful and efficient. Let's
                    redefine the way you interact online! 🚀
                  </span> */}
                  <span style={{ color: "grey", fontWeight: 400 }}>
                    By fetching your data from your website, we can craft a
                    custom bot tailored just for your business. It'll be trained
                    to answer questions specific to your brand, ensuring each
                    customer interaction is both meaningful and efficient. Let's
                    redefine the way you interact online! 🚀
                  </span>
                </Typography>
              </Box>
            </Box>
            <Box height={50}></Box>
          </div>
        )}
        {/* Loader Animation */}

        <Box mt={2}>
          {state ? (
            // <CircularProgress />
            // <Box sx={{ width: "500px" }}>
            //   <LinearProgress color="secondary" />
            // </Box>
            <Box sx={{ width: "500px" }}>
              <LinearProgressWithLabel value={progress} />
            </Box>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                handleLoad();
                setstate(true);
              }}
              sx={{
                borderRadius: "10px",
                background:
                  "linear-gradient(180deg, rgb(105.08, 50, 131) 0%, rgb(50.16, 50.16, 130.74) 100%)",
              }}
            >
              {/* I Agree to Fetch Data */}
              Let's Fetch
            </Button>
          )}
        </Box>
        {/* <div>
          <Box textAlign="center" sx={{ width: "400px" }}>
            <Typography
              variant="h6"
              style={{ marginLeft: "18px", fontSize: "18px" }}
            >
              Sorry! We experience some error while fetching data!
            </Typography>
          </Box>
          <Box height={25}></Box>
        </div>
        <Box mt={2}>
          {error && state ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                handleLoad();
                setstate(true);
              }}
            >
              I Agree to Fetch Data
            </Button>
          )}
        </Box> */}

        {/* Placeholder for any other animation */}
        <Box mt={2}>{/* Add any other animation component here */}</Box>
      </Box>
    </div>
  );
};

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default ExtractData;
