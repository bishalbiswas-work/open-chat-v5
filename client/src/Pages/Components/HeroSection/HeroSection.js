import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";

import "./style.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";

// Fiebase
// import db from "../../Auth/Firebase";
import { db } from "../../Auth/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// End Firebase

// import "react-phone-input-2/lib/style.css"; // Import the library's CSS
// import retargetEvents from "react-shadow-dom-retarget-events";

// External Components
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the library's CSS

// End External Components
// ContextAPI
import { useContext } from "react";
import DataContext from "../../../ContextAPI/DataState";
// End ContextAPI
const StyledPhoneInput = styled(PhoneInput)`
  /* Your custom styles go here */
`;
const HeroSection = () => {
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);

  const [contactNumber, setContactNumber] = useState("");
  const [input, setInput] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
  function getCurrentURL() {
    const currentURL = window.location.href;
    return currentURL;
  }

  useEffect(() => {
    console.log(dataContext.phoneNumber);
    dataContext.setPhoneNumberFunction({
      data: contactNumber,
    });
  }, [contactNumber]);
  const handleChange = (e) => {
    const enteredValue = e.target.value;
    setInput(enteredValue);

    // Regular expression to check for a valid URL format
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const urlVal = "https://" + enteredValue;
    // Check if the entered value matches the URL format
    setIsValidUrl(urlRegex.test(urlVal));

    dataContext.setWebsiteFunction({ data: urlVal });
    const url = getCurrentURL();

    dataContext.setSourceUrlFunction({ data: url });
  };
  const handelGetStarted = async () => {
    console.log("clicked get started");
    // try {
    //   const contactsCollection = collection(db, "LP_PhoneNumber");
    //   await addDoc(contactsCollection, {
    //     website: input,
    //     phoneNumber: contactNumber,
    //     timestamp: serverTimestamp(),
    //   });
    //   console.log("Phone number uploaded successfully");
    // } catch (error) {
    //   console.error("Error uploading phone number: ", error);
    // }
    const url = getCurrentURL();
    console.log(contactNumber);
    console.log(input);

    dataContext.updateOrCreateFirebaseDoc();

    delay(2000).then(() => {
      // navigate("/auth");
      navigate("/extract-data");
    });
  };

  return (
    <>
      <div className="index">
        <div className="div">
          <div className="overlap">
            {/* <img
              className="https-lottiefiles"
              alt="Https lottiefiles"
              src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/https---lottiefiles-com-animations-cash-hfprpce7xt.svg"
            /> */}
            {/* <img
              className="message-thread"
              alt="Message thread"
              src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/message-thread-2.png"
            /> */}
            <div className="group-mod">
              <div className="div-2">
                <div className="phone-input">
                  {input && (
                    <Box style={{ p: 2, display: "flex" }}>
                      {/* <StyledPhoneInput> */}
                      <Box>
                        <PhoneInput
                          style={{ border: "none", width: "350px !important" }}
                          country={"us"}
                          value={dataContext.phoneNumber}
                          onChange={(newNumber) => {
                            // console.log("New number:", newNumber);
                            // setContactNumber(newNumber);
                            dataContext.setPhoneNumberFunction({
                              data: newNumber,
                            });
                          }}
                        />
                      </Box>
                      <Box sx={{ mx: 1 }}>
                        <Button
                          onClick={() => handelGetStarted()}
                          variant="contained"
                          style={{
                            fontSize: "12px",
                            background:
                              "linear-gradient(180deg, rgb(105.08, 50, 131) 0%, rgb(50.16, 50.16, 130.74) 100%)",
                            padding: "8px 15px", // Adjust padding as needed
                            borderRadius: "8px", // Adjust border radius as needed
                          }}
                        >
                          Get Started
                        </Button>
                      </Box>

                      {/* <ContactNumber
                          // width="250px"
                          value={contactNumber}
                          // onChange={setContactNumber}
                          onChange={(newNumber) => {
                            console.log("New number:", newNumber);
                            setContactNumber(newNumber);
                          }}
                        /> */}
                      {/* <ContactNumber
                          value={dataContext.phoneNumber} // Use phoneNumber from context
                          onChange={(newPhoneNumber) =>
                            dataContext.setPhoneNumberFunction({
                              data: newPhoneNumber,
                            })
                          } // Update phoneNumber in context
                        /> */}
                      {/* </StyledPhoneInput> */}
                    </Box>
                  )}
                  {/* <div className="area">
                    <div className="content">
        
                     <div className="icon-text">
                        <div className="country">
                          <img
                            className="img"
                            alt="Icon flag america"
                            src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/icon-flag-america.svg"
                          />
                          <img
                            className="img"
                            alt="Icon caret down"
                            src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/icon-caret-down.svg"
                          />
                          <div className="area-code">+1</div>
                        </div>
                        <div className="input-label">
                          <div className="top-label">Phone Number</div>
                        </div>
                      </div> 
                    </div>
                  </div> */}
                  {input && (
                    <div className="helpertext">
                      <p className="text-helper">
                        We will use this number to validate your website.
                      </p>
                    </div>
                  )}
                </div>

                <div className="div-2">
                  <div className="column">
                    <div className="heading-wrapper">
                      <div className="heading">
                        <p className="text-wrapper">
                          Turn Cold Conversations to Warm Conversions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-wrapper-2">Easily integrates with</div>
                  <div className="text-wrapper-3">No Credit Card Required</div>
                  <div className="mobile-number">
                    <div className="input-field-text">
                      <div className="frame">
                        <div className="text-wrapper-4">Your website URL</div>
                      </div>
                    </div>
                    <div className="input-field-text-2">
                      <div className="frame-2" />
                    </div>
                  </div>
                  {/* <img
                    className="https-lottiefiles-2"
                    alt="Https lottiefiles"
                    src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/https---lottiefiles-com-animations-chat-bot-test-8cc8u25y4d.gif"
                  /> */}
                  <div>
                    {/* <Box
                      className="https-lottiefiles-2-mod"
                      style={{ marginTop: "-20px" }}
                    >
                      <Typography>FB + ChatGPT : 60 sec setup</Typography>
                    </Box> */}
                    <img
                      className="https-lottiefiles-2-mod"
                      alt="Https lottiefiles"
                      src="/assets/herosection_chat_display.gif"
                      style={{
                        marginBottom: "-25px !important",
                        width: "500px !important",
                        borderRadius: "25px",
                      }}
                    />
                  </div>
                  <div
                    className="field-box"
                    style={{ border: "none", padding: 0 }}
                  >
                    {/* <p className="p">Please enter Your website URL</p> */}
                    {/* <TextField
                      variant="outlined"
                      type="text"
                      fullWidth
                      // value={input}
                      sx={{
                        fontSize: "12px", // reduced font size
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "transparent", // make the border transparent
                          },
                          "&:hover fieldset": {
                            borderColor: "transparent", // make the hover border transparent
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "transparent", // make the focus border transparent
                          },
                        },
                        "& .MuiInputBase-root": {
                          height: "40px", // reduce the height, but ensure it's enough for the text and padding
                        },
                      }}
                      // onChange={(e) => setInput(e.target.value)}
                      // onKeyPress={(e) => {
                      //   if (e.key === "Enter") {
                      //     e.preventDefault();
                      //     handleSubmit();
                      //     setInput(""); // Clear the input
                      //   }
                      // }}
                    /> */}
                    <Box
                      style={{
                        border: "1px solid lightgrey",
                        padding: "5px 25px",
                        borderRadius: "15px",
                        width: "550px",
                        display: "flex", // Display children in a single line
                        alignItems: "center", // Vertically align children
                      }}
                    >
                      <TextField
                        variant="outlined"
                        type="text"
                        fullWidth
                        value={input}
                        onChange={handleChange}
                        placeholder="example.com"
                        sx={{
                          fontSize: "12px",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              // borderColor: isValidUrl ? "transparent" : "red", // Red border for invalid URL
                              borderColor: "transparent", // make the border transparent
                            },
                            "&:hover fieldset": {
                              // borderColor: isValidUrl ? "transparent" : "red", // Red border for invalid URL
                              borderColor: "transparent", // make the border transparent
                            },
                            "&.Mui-focused fieldset": {
                              // borderColor: isValidUrl ? "transparent" : "red", // Red border for invalid URL
                              borderColor: "transparent", // make the border transparent
                            },
                          },
                          "& .MuiInputBase-root": {
                            height: "40px",
                          },
                        }}
                      />
                      {!input && (
                        <Box width="70px">
                          <Button
                            variant="contained"
                            style={{
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
                              Confirm
                            </Typography>
                          </Button>
                        </Box>
                      )}
                    </Box>
                    {input && !isValidUrl && (
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
                    {input && isValidUrl && (
                      <Box>
                        <CheckCircleIcon style={{ color: "green" }} />
                      </Box>
                    )}
                  </div>
                  {/* {input && (
                    <Button
                      className="button-main"
                      onClick={() => handelGetStarted()}
                    >
                      <div className="frame-3">
                        <div>
                          <div className="text-wrapper-5">Get Started</div>
                        </div>
                      </div>
                    </Button>
                  )} */}
                  <p className="forget-breakable">
                    <span className="span">
                      Forget breakable Auto-Replies. Power Your Messenger with{" "}
                    </span>
                    <span className="text-wrapper-6">Custom</span>
                    <span className="span"> GPT4 in </span>
                    <span className="text-wrapper-7">30 Seconds</span>
                    <span className="span">. </span>
                    <span className="span">All Languages Supported.</span>
                  </p>
                </div>
              </div>
              <div className="overlap-group">
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
              {/* <img
                className="https-lottiefiles-3"
                alt="Https lottiefiles"
                src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/https---lottiefiles-com-animations-email-1jxzvlz2gb.gif"
              /> */}
            </div>
            <p className="text-wrapper-8">No Credit Card or Coding Required</p>
          </div>
          <div className="div-3">
            <div className="heading-join">TRUSTED BY +5,000 BUSINESSES</div>
            <div className="list">
              <div className="frame-4">
                <img
                  className="youtube"
                  alt="Youtube"
                  src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/youtube-2@2x.png"
                />
                <img
                  className="clipify-logos"
                  alt="Clipify logos"
                  src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/clipify-logos-transparent-1-1@2x.png"
                />
                <img
                  className="frame-5"
                  alt="Frame"
                  src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/frame-1000002902-1@2x.png"
                />
                <img
                  className="download"
                  alt="Download"
                  src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/download--1--1@2x.png"
                />
                <img
                  className="download-2"
                  alt="Download"
                  src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/download-1@2x.png"
                />
                <img
                  className="notion-logo"
                  alt="Notion logo"
                  src="https://cdn.animaapp.com/projects/64f3ac035a4d20dc269603af/releases/650f35797868a0752921eec2/img/notion-logo.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function ContactNumber(props) {
  const handleChange = (newValue) => {
    props.onChange(newValue);
  };
  return (
    <Box>
      <PhoneInput country={"us"} value={props.value} onChange={handleChange} />
    </Box>
  );

  // return <MuiTelInput value={props.value} onChange={handleChange} />;
}
export default HeroSection;
