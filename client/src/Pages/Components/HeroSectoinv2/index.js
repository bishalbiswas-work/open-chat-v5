import React from "react";
import axios from "axios";

import ImageTextLoop from "./ImageTextLoop";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../ContextAPI/DataState";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { Box, Typography, Button, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";

const HeroSectionv2 = () => {
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);

  const [contactNumber, setContactNumber] = useState("");
  const [input, setInput] = useState("");
  const [successUrl, setSuccessUrl] = useState(false);
  const [checkUrlStatus, setCheckUrlStatus] = useState(true);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [confirmClick, setConfirmClick] = useState(false);

  const [number, setNumber] = useState(null);
  const [validNumber, setValidNumber] = useState({
    valid: false,
    click: false,
  });
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
  function getCurrentURL() {
    const currentURL = window.location.href;
    return currentURL;
  }

  useEffect(() => {
    dataContext.setPhoneNumberFunction({
      data: contactNumber,
    });
  }, [contactNumber]);

  const handleChange = (e) => {
    const enteredValue = e.target.value;
    setInput(enteredValue);
    setConfirmClick(false);
  };

  const handleChangeNumber = (number) => {
    setContactNumber(number);
  };

  // const handleConfirm = () => {
  //   // Regular expression to check for a valid URL format
  //   const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  //   // Check if the entered value matches the URL format
  //   setIsValidUrl(urlRegex.test(input));
  //   setConfirmClick(true);
  //   if (urlRegex.test(input)) {
  //     setSuccessUrl(true);
  //   }
  //   dataContext.setWebsiteFunction({ data: input });
  //   const url = getCurrentURL();
  //   dataContext.setSourceUrlFunction({ data: url });
  // };
  const handleConfirm = async () => {
    // Regular expression to check for a valid URL format
    console.log("Url: ", input);
    setCheckUrlStatus(false);
    const submitData = {
      url: input,
    };
    const response = await checkUrl(submitData);
    console.log("backend : ", response);
    if (response.data.status) {
      // Check if the entered value matches the URL format
      setCheckUrlStatus(true);
      setIsValidUrl(true);
      setConfirmClick(false);
      setSuccessUrl(true);
      setInput(response.data.rootUrl);

      dataContext.setWebsiteFunction({ data: response.data.rootUrl });
      const url = getCurrentURL();
      dataContext.setSourceUrlFunction({ data: url });

      // =============================

      dataContext.updateOrCreateFirebaseDoc();
      dataContext.getTrained({
        website: response.data.rootUrl,
        phoneNumber: "00000000",
      });
      delay(2000).then(() => {
        // navigate("/auth");
        navigate("/extract-data");
      });
    } else {
      setCheckUrlStatus(true);
      setIsValidUrl(false);
      setConfirmClick(true);

      setSuccessUrl(false);
    }
  };

  const handelGetStarted = async () => {
    const strippedPhone = contactNumber.replace(/\D/g, ""); // Removes non-digit characters

    if (strippedPhone.length < 7 || strippedPhone.length > 15) {
      return setValidNumber({ valid: false, click: true });
    }

    const numberRegex = new RegExp(
      /^\+?(\d{1,4}[-.\s]?)?(\()?(\d{1,3})?(\))?[-.\s]?\d{1,15}([-.\s]?\d{1,15})?$/
    );
    if (numberRegex.test(`+${contactNumber}`)) {
      console.log("clicked get started");
      const url = getCurrentURL();
      setValidNumber({ valid: true, click: true });
      dataContext.updateOrCreateFirebaseDoc();

      delay(2000).then(() => {
        // navigate("/auth");
        navigate("/extract-data");
      });
    } else {
      setValidNumber({ valid: false, click: true });
    }
  };
  const checkUrl = async (submitData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/check-url`,
        // "http://localhost:5000/api/check-url",

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

  return (
    <div className="hero">
      <div className="left">
        <h1 className="hero-heading">
          Turn Cold Conversations to Warm Conversions.
        </h1>
        <p className="hero-sub-text">
          Forget breakable Auto-Replies. Power Your Messenger with{" "}
          <strong style={{ fontWeight: "bold", textDecoration: "underline" }}>
            Custom
          </strong>{" "}
          GPT4 in 30 Seconds{" "}
          <strong style={{ fontWeight: "bold", textDecoration: "underline" }}>
            For Free.
          </strong>{" "}
          All Languages Supported.
        </p>
        <div className="field-box" style={{ border: "none", padding: 0 }}>
          <Box style={{ display: "flex" }}>
            <Box width="70%">
              <p className="url-text">Your website URL</p>
              {/* <TextField
                variant="outlined"
                type="text"
                fullWidth
                disabled={successUrl}
                value={input}
                onChange={handleChange}
                placeholder="example.com"
                error={confirmClick && !isValidUrl}
                sx={{
                  borderRadius: "15px !important",
                  "&.MuiTextField-root.Mui-error": {
                    borderColor: "red",
                  },
                }}
              /> */}
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                disabled={successUrl}
                value={input}
                onChange={handleChange}
                placeholder="example.com"
                error={confirmClick && !isValidUrl}
                sx={{
                  borderRadius: "15px !important",
                  "&.MuiTextField-root.Mui-error": {
                    borderColor: "red",
                  },
                  "& .MuiInputBase-input": {
                    // height: "2.3em !important", // Adjust the value as needed
                  },
                }}
              />
            </Box>
            <Box width="30%" style={{ position: "relative" }}>
              {!successUrl && checkUrlStatus && (
                <Button
                  variant="contained"
                  onClick={handleConfirm}
                  style={{
                    background:
                      "linear-gradient(180deg, rgb(105.08, 50, 131) 0%, rgb(50.16, 50.16, 130.74) 100%)",
                    padding: "8px 15px",
                    borderRadius: "8px",
                    position: "absolute",
                    width: "150px",
                    top: "56px",
                    left: "-155px",
                    height: "38px",
                  }}
                >
                  <Typography
                    fontSize="10px !important"
                    style={{ fontFamily: "Inter, sans-serif " }}
                  >
                    Confirm
                  </Typography>
                </Button>
              )}
              {!successUrl && !checkUrlStatus && (
                <CircularProgress
                  style={{
                    color: "purple",
                    position: "absolute",
                    top: "56px",
                    left: "10px",
                  }}
                />
              )}
              {input && isValidUrl && (
                <Box>
                  <CheckCircleIcon
                    style={{
                      color: "green",
                      position: "absolute",
                      top: "56px",
                      left: "10px",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
          {confirmClick && !isValidUrl && (
            <Typography
              variant="h6"
              style={{
                color: "red",
                marginTop: "2px",
                fontSize: "12px",
              }}
            >
              Entered URL is not valid.
            </Typography>
          )}
        </div>
        <div>
          {/* {successUrl && (
            <Box style={{ p: 2, display: "flex", marginTop: "2rem" }}>
             
              <Box>
                <PhoneInput
                  placeholder="Phone Number"
                  specialLabel="Phone number"
                  inputStyle={{
                    width: "473px",
                    borderRadius: "15px",
                    height: "50px",
                    borderColor:
                      !validNumber.valid && validNumber.click ? "red" : "none",
                  }}
                  containerStyle={{
                    color:
                      !validNumber.valid && validNumber.click ? "red" : "none",
                  }}
                  country={"us"}
                  value={dataContext.phoneNumber}
                  onChange={(newNumber) => handleChangeNumber(newNumber)}
                />
              </Box>
              <Box sx={{ position: "relative" }}>
                <Button
                  variant="contained"
                  onClick={() => handelGetStarted()}
                  style={{
                    position: "absolute",
                    left: "-157px",
                    top: "7px",
                    width: "150px",
                    height: "35px",
                    background:
                      "linear-gradient(180deg, rgb(105.08, 50, 131) 0%, rgb(50.16, 50.16, 130.74) 100%)",
                    padding: "8px 15px", // Adjust padding as needed
                    borderRadius: "8px", // Adjust border radius as needed
                  }}
                >
                  <Typography
                    fontSize="10px !important"
                    style={{ fontFamily: "Inter, sans-serif " }}
                  >
                    Get Started
                  </Typography>
                </Button>
              </Box>
            </Box>
          )}
          {!validNumber.valid && validNumber.click && (
            <Typography
              variant="h6"
              style={{
                color: "red",
                marginTop: "2px",
                fontSize: "12px",
              }}
            >
              Please enter valid phone number to get started
            </Typography>
          )}
          {successUrl && (
            <div className="helpertext">
              <p className="text-helper">
                We will use this number to validate your website.
              </p>
            </div>
          )} */}
        </div>
        <p className="hero-text">No Credit Card or Coding Required</p>
        <div className="hero-bot-text">
          <p className="easy">Easily integrates with</p>
          <div className="social">
            <img
              className="social-media"
              alt="Social media"
              src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/social-media---messenger.svg"
            />
            <img
              className="social-media-2"
              alt="Social media"
              src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/social-media---instagram.svg"
            />
            <img
              className="social-media-3"
              alt="Social media"
              src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/social-media---whatsapp-1.svg"
            />
          </div>
        </div>
      </div>
      <div className="right">
        <ImageTextLoop />
      </div>
    </div>
  );
};

export default HeroSectionv2;
