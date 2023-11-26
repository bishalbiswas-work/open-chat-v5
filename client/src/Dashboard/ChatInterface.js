import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
//
//
//
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

// External Lib

//
// Firebase
import { db } from "../Pages/Auth/Firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
// End Firebase
// End External Lib
// ContextAPI
import { useContext } from "react";
import DataContext from "../ContextAPI/DataState";
const ChatInterface = () => {
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const [docData, setDocData] = useState({});
  const [profileUrl, setProfileUrl] = useState("");
  // const [messages, setMessages] = useState([
  //   { sender: "bot", text: "Hello! How can I assist you today?" },
  // ]);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hello! I am ${dataContext.name} AI, Ask me any questions!`,
    },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);
  // const docId = dataContext.uid;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  const updataData = () => {
    dataContext.updateOrCreateFirebaseDoc();
  };
  const handleSubmit = async () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "user", text: input }]);
      //   const userinput = JSON.stringify(messages);
      console.log(messages.slice(-4));
      //   const submitData = {
      //     userQuestion: userinput,
      //   };
      // Extract the last four messages
      const lastFourMessages = messages.slice(-4).map((msg) => msg.text);

      // Determine the properties based on the length of lastFourMessages
      const secondLastMsg =
        lastFourMessages.length >= 2
          ? lastFourMessages[lastFourMessages.length - 2]
          : "";
      const thirdLastMsg =
        lastFourMessages.length >= 3
          ? lastFourMessages[lastFourMessages.length - 3]
          : "";
      const fourthLastMsg =
        lastFourMessages.length >= 4 ? lastFourMessages[0] : "";

      // Prepare the submit data
      const submitData = {
        userQuestion: input,
        secondLastMsg,
        thirdLastMsg,
        fourthLastMsg,
      };

      console.log(submitData);
      const reply = await getResponse(submitData, dataContext.authToken);
      //   console.log(reply);
      //   setMessages((prev) => [
      //     ...prev,
      //     { sender: "bot", text: reply.data.response },
      //   ]);
      // If messages count is more than 3, add the additional message
      if (messages.length > 3) {
        setMessages((prev) => [
          ...prev,

          { sender: "bot", text: reply.data.response },
          {
            sender: "bot",
            text: "Sorry, due to free trial limitation, I wasn’t able to go over all your history to know the answer to your question. Could you please upgrade so I can learn everything?",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: reply.data.response },
        ]);
      }
      setInput("");

      dataContext.setMessagesFunction({ data: messages });
      updataData();
    }
  };
  const getResponse = async (submitData, bearerToken) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/get-response`,
        // "http://localhost:5000/api/get-response",

        submitData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`, // Added this line
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div style={{ height: "100vh", width: "100wh" }}>
        <Container maxWidth="xl">
          <Box style={{ height: "100px" }}></Box>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Grid container spacing={3} justifyContent="center">
                {/* First section */}
                <Grid
                  item
                  xs={12}
                  md={7}
                  style={{
                    borderRadius: "25px",
                    background: "white",
                    padding: "0",
                  }}
                >
                  <div>
                    <Grid
                      container
                      direction="column"
                      // spacing={2}
                      style={{ height: "100%", background: "" }}
                    >
                      <Grid item>
                        {/* <Box height={20}></Box> */}
                        <Box sx={{ flexGrow: 1 }}>
                          <AppBar
                            position="static"
                            sx={{
                              background: "white",
                              borderRadius: "15px 15px 0 0",
                            }}
                          >
                            <Toolbar>
                              <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                              >
                                {/* <MenuIcon /> */}
                                {/* <Avatar src={dataContext.profileUrl} /> */}
                                <Avatar
                                  src={
                                    dataContext.profileUrl
                                      ? dataContext.profileUrl
                                      : ""
                                  }
                                />
                              </IconButton>
                              <Typography
                                variant="h6"
                                component="div"
                                style={{
                                  fontFamily: "Inter, sans-serif ",
                                }}
                                sx={{ flexGrow: 1, color: "black" }}
                              >
                                {dataContext.name
                                  ? dataContext.name
                                  : "<Your Business Name>"}
                              </Typography>
                              {/* <Button color="inherit">Login</Button> */}
                              <Box>
                                <InfoIcon />
                              </Box>
                            </Toolbar>
                          </AppBar>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Paper elevation={1}>
                          <div style={{ width: "100%", marginTop: "2px" }}>
                            <Box
                              style={{
                                // display: "flex",
                                //   marginTop: "20px",
                                //   marginBottom: "20px",
                                height: "60vh",
                                overflowY: "scroll",

                                //   border: "1px solid lightgrey",
                                //   borderRadius: "15px",
                              }}
                            >
                              <List
                                style={{
                                  overflowY: "auto",
                                  scrollbarWidth: "none",
                                  msOverflowStyle: "none",
                                }}
                              >
                                {messages.map((message, index) => (
                                  <ListItem
                                    key={index}
                                    alignItems="flex-start"
                                    style={{
                                      justifyContent:
                                        message.sender === "bot"
                                          ? "flex-start"
                                          : "flex-end",
                                    }}
                                  >
                                    {message.sender === "bot" && (
                                      <ListItemAvatar>
                                        <Avatar
                                          src={
                                            dataContext.profileUrl
                                              ? dataContext.profileUrl
                                              : ""
                                          }
                                        />
                                      </ListItemAvatar>
                                    )}
                                    <Box
                                      sx={{
                                        maxWidth: 400,
                                        // border: "1px solid",
                                        borderRadius: "15px",
                                        backgroundColor:
                                          message.sender === "bot"
                                            ? "#E4E6EB"
                                            : "#0084FF",
                                        color:
                                          message.sender === "bot"
                                            ? "black"
                                            : "white",
                                        padding: "10px",
                                        overflowWrap: "break-word", // For long unbroken strings
                                      }}
                                    >
                                      <ListItemText
                                        primary={message.text}
                                        align={
                                          message.sender === "bot"
                                            ? "left"
                                            : "left"
                                        }
                                        style={{
                                          fontFamily:
                                            "Inter, sans-serif !important",
                                        }}
                                      />
                                    </Box>
                                  </ListItem>
                                ))}
                                <div ref={messagesEndRef} />
                              </List>
                            </Box>
                          </div>
                        </Paper>
                      </Grid>
                      <Grid item>
                        <AppBar
                          position="static"
                          sx={{
                            background: "white",
                            borderRadius: " 0 0 15px 15px",
                            pb: 2,
                            px: 1,
                          }}
                        >
                          <Box style={{ display: "flex" }}>
                            <Box
                              style={{
                                display: "flex",
                                flexGrow: 1,
                                marginTop: "20px",
                                marginLeft: "15px",
                                backgroundColor: "#F0F2F5",
                                border: "1px solid lightgrey",
                                borderRadius: "15px",
                              }}
                            >
                              <TextField
                                placeholder="Aa"
                                variant="outlined"
                                type="text"
                                fullWidth
                                value={input}
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
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSubmit();
                                    setInput(""); // Clear the input
                                  }
                                }}
                              />

                              <Box
                                height="100%"
                                style={{
                                  display: "",
                                  justifyContent: "cemter",
                                }}
                              >
                                <Box height="5px" backgroundColor=""></Box>
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={handleSubmit}
                                  sx={{
                                    fontFamily: "Inter, sans-serif !important",
                                  }}
                                  style={{
                                    display: "flex", // Added to help with alignment
                                    alignItems: "center", // Center items vertically
                                    justifyContent: "center", // Center items horizontally

                                    color: "white",
                                    borderRadius: "10px",
                                    background: "#0084FF",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    textTransform: "none",

                                    // p: 0,
                                  }}
                                >
                                  {/* <SendIcon /> */}
                                  <img
                                    width="20px"
                                    src="/assets/send-icon.png"
                                    style={{ paddingRight: "2px" }}
                                  />
                                  Send
                                </Button>
                              </Box>
                            </Box>
                            <Box
                              height="100%"
                              style={{
                                justifyContent: "cemter",
                                alignItems: "center",
                                marginTop: "22px",
                              }}
                            >
                              <Button>
                                {/* <ThumbUpIcon style={{ color: "#0084FF" }} /> */}
                                <img src="/assets/thumup.png" />
                              </Button>
                            </Box>
                          </Box>
                        </AppBar>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                {/* Second section */}
                {/* <Grid
                  item
                  xs={6}
                  md={4}
                  style={{
                    height: "100%",

                    justifyContent: "center",
                  }}
                >
                  <div>
                    <img
                      src="/assets/review 1.png"
                      alt="Description 1"
                      style={{ maxWidth: "450px" }}
                    />
                  </div>

                  <div>
                    <img
                      src="/assets/review 2.png"
                      alt="Description 2"
                      style={{ maxWidth: "450px" }}
                    />
                  </div>

                  <div>
                    <img
                      src="/assets/Trustpilot.png"
                      alt="Description 3"
                      style={{ maxWidth: "450px" }}
                    />
                  </div>
                </Grid> */}
                <Grid
                  item
                  xs={6}
                  md={4}
                  //   lg={6}
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <img
                      src="/assets/review 1.png"
                      alt="Description 1"
                      style={{ maxWidth: "350px" }}
                    />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <img
                      src="/assets/review 2.png"
                      alt="Description 2"
                      style={{ maxWidth: "350px" }}
                    />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/assets/Trustpilot.png"
                      alt="Description 3"
                      style={{ maxWidth: "350px" }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        {/* <Grid item> */}
        <Box
          display="flex"
          justifyContent="center"
          position="fixed" // Set the position to fixed
          bottom="0" // Position the box at the bottom
          width="100%" // Make the box full width so the button remains centered
          sx={{ background: "white", py: 2 }}
        >
          <Button
            variant="contained"
            href="https://buy.stripe.com/bIY02p18J2Ez9tS3co"
            //   onClick={() => handleSelectPage(selectedCountry)}
            sx={{
              // backgroundColor: "#2196f3",
              background:
                "linear-gradient(180deg, rgb(105.08, 50, 131) 0%, rgb(50.16, 50.16, 130.74) 100%)",
              borderRadius: "15px",
              py: 1,
              px: 4,
            }}
          >
            <Typography style={{ fontSize: "12px", marginLeft: "20px" }}>
              Power my Messenger with AI
            </Typography>
            <img src="/assets/messenger-icon.png" />
          </Button>
        </Box>
        {/* </Grid> */}
      </div>
    </>
  );
};
export default ChatInterface;
