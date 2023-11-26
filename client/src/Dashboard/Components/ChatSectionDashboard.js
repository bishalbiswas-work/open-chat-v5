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
// import SendIcon from "@mui/icons-material/Send";
import SendIcon from "@mui/icons-material/Send";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Dot } from "react-animated-dots";
// ContextAPI
import { useContext } from "react";
import DataContext from "../../ContextAPI/DataState";
// ContextAPI End
import jwt_decode from "jwt-decode";

const ChatSectionDashboard = ({ heightVal }) => {
  // Base Url
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  //
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const [docData, setDocData] = useState({});

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hi 👋 I’m ${
        (dataContext.name?.charAt(0)?.toUpperCase() ?? "") +
        (dataContext.name?.slice(1) ?? "")
      }, ask me anything about ${
        (dataContext.name?.charAt(0)?.toUpperCase() ?? "") +
        (dataContext.name?.slice(1) ?? "")
      }!`,
    },
    // {
    //   sender: "bot",
    //   text: "By the way, did you know you can have your own custom GPT connected to your messenger?",
    // },
    {
      sender: "bot",
      text: "By the way, did you know you can connect your FB messenger with custom GPT?",
    },
  ]);

  const [input, setInput] = useState("");
  const [msgGen, setMsgGen] = useState(false);
  const messagesEndRef = useRef(null);
  const [profileUrl, setProfileUrl] = useState("");

  const [isSelected, setIsSelected] = useState(false);

  const scrollToBottom = () => {
    if (isSelected) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages, isSelected]);

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
      if (reply) {
        // if (messages.length > 3) {
        //   setMessages((prev) => [
        //     ...prev,

        //     { sender: "bot", text: reply.data.response },
        //     {
        //       sender: "bot",
        //       text: "Sorry, due to free trial limitation, I wasn’t able to go over all your history to know the answer to your question. Could you please upgrade so I can learn everything?",
        //     },
        //   ]);
        // } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: reply.data.response },
        ]);
        // }
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Error! Unable to connect!" },
        ]);
      }
      setInput("");
      dataContext.setMessagesLPFunction({ data: messages });
      setMsgGen(false);
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
      <div onClick={() => setIsSelected(true)}>
        <div style={{ height: "100%", width: "100%" }}>
          <Container maxWidth="xl">
            {/* <Box style={{ height: "100px" }}></Box> */}
            <div sx={{ alignItems: "center" }}>
              <Grid
                container
                direction="column"
                // spacing={2}
                style={{
                  height: "100%",
                  background: "",
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Grid item textAlign="center">
                  {/* <Box style={{ my: 2 }}>
                    <Typography
                      style={{ fontSize: "52px", fontWeight: "bold" }}
                    >
                      Test it for Yourself!
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "grey",
                      }}
                    >
                      MessengerGPT's messenger is trained on previous message +
                      website's data.
                    </Typography>
                  </Box>
                  <Box style={{ height: "50px" }}></Box> */}
                </Grid>
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
                          sx={{
                            flexGrow: 1,
                            color: "black",
                            fontWeight: "500",
                            fontSize: "16px",
                          }}
                        >
                          {dataContext.name
                            ? (dataContext.name?.charAt(0)?.toUpperCase() ??
                                "") + (dataContext.name?.slice(1) ?? "")
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
                          //   height: "60vh",
                          height: "450px",
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
                                <Avatar
                                  src={
                                    dataContext.profileUrl
                                      ? dataContext.profileUrl
                                      : ""
                                  }
                                />
                              )}
                              <Box
                                sx={{
                                  maxWidth: 400,
                                  // border: "1px solid",
                                  borderRadius: "15px",
                                  backgroundColor:
                                    message.sender === "bot"
                                      ? "#E4E6EB"
                                      : "#4E5BF6",
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
                                    message.sender === "bot" ? "left" : "right"
                                  }
                                  style={{
                                    textAlign: "left",
                                    fontSize: "16px",
                                    fontFamily: "Inter, sans-serif !important",
                                  }}
                                />
                              </Box>
                            </ListItem>
                          ))}
                          <div ref={messagesEndRef} />
                          {msgGen && (
                            <div>
                              <ListItem
                                // key={index}
                                alignItems="flex-start"
                                style={{
                                  justifyContent: "flex-start",
                                }}
                              >
                                {
                                  <Avatar
                                    src={
                                      dataContext.profileUrl
                                        ? dataContext.profileUrl
                                        : ""
                                    }
                                  />
                                }
                                <Box
                                  sx={{
                                    maxWidth: 400,
                                    // border: "1px solid",
                                    borderRadius: "15px",
                                    backgroundColor: "#E4E6EB",
                                    color: "black",
                                    padding: "10px",
                                    paddingTop: "0px",
                                    overflowWrap: "break-word", // For long unbroken strings
                                  }}
                                >
                                  {/* <ListItemText
                                  primary={"sdf"}
                                  align="left"
                                  style={{
                                    textAlign: "left",
                                    fontSize: "16px",
                                    fontFamily: "Inter, sans-serif !important",
                                  }}
                                /> */}
                                  <div>
                                    <Dot
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "40px",
                                      }}
                                    >
                                      .
                                    </Dot>
                                    <Dot
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "40px",
                                      }}
                                    >
                                      .
                                    </Dot>
                                    <Dot
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "40px",
                                      }}
                                    >
                                      .
                                    </Dot>
                                  </div>
                                </Box>
                              </ListItem>
                            </div>
                          )}
                        </List>
                      </Box>
                      {/* <Box
                        width="100%"
                        sx={{ background: "grey", display: "flex" }}
                      >
                        {dataContext.commonQuestions.map((message, index) => (
                          <Box
                            key={index}
                            sx={{
                              // maxWidth: 400,
                              // border: "1px solid",
                              borderRadius: "15px",
                              backgroundColor: "#E4E6EB",
                              // color: message.sender === "bot" ? "black" : "white",
                              padding: "10px",
                              // overflowWrap: "break-word", // For long unbroken strings
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "12px", color: "grey" }}
                            >
                              {message}
                            </Typography>
                          </Box>
                        ))}
                      </Box> */}
                      <Box
                        // width="400px"
                        sx={{
                          // background: "grey",
                          display: "flex",
                          // overflowX: "auto", // Allow horizontal scrolling
                          whiteSpace: "nowrap", // Prevent wrapping to the next line
                          p: 1,
                        }}
                      >
                        {dataContext.commonQuestions.slice(0, 1).map(
                          (
                            message,
                            index // Take the top 5 messages
                          ) => (
                            <Button
                              key={index}
                              onClick={() => {
                                console.log(message);
                                setInput(message);
                              }}
                              sx={{
                                textTransform: "none",
                                borderRadius: "15px",
                                backgroundColor: "#E4E6EB",
                                padding: "10px",
                                marginRight: "10px", // Add some spacing between boxes
                                display: "inline-block", // This will prevent the Box from taking full width and thus allowing them to line up horizontally
                              }}
                            >
                              <Typography
                                sx={{ fontSize: "12px", color: "grey" }}
                              >
                                {message}
                              </Typography>
                            </Button>
                          )
                        )}
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
                          marginTop: "10px",
                          marginLeft: "15px",
                          // backgroundColor: "#F0F2F5",
                          // border: "1px solid lightgrey",
                          borderRadius: "15px",
                        }}
                      >
                        <TextField
                          placeholder="Ask a question...."
                          variant="outlined"
                          type="text"
                          fullWidth
                          value={input}
                          style={{
                            fontFamily: "Inter, sans-serif !important",
                          }}
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
                          <IconButton
                            variant="contained"
                            size="small"
                            onClick={() => {
                              handleSubmit();
                              setMsgGen(true);
                              console.log("send button clicked");
                            }}
                            sx={{
                              fontFamily: "Inter, sans-serif !important",
                            }}
                            style={{
                              display: "flex", // Added to help with alignment
                              alignItems: "center", // Center items vertically
                              justifyContent: "center", // Center items horizontally

                              color: "black",
                              borderRadius: "10px",
                              // background: "#0084FF",
                              background: "transparent",
                              fontSize: "12px",
                              fontWeight: "700",
                              textTransform: "none",

                              // p: 0,
                            }}
                          >
                            <SendIcon />
                            {/* <img
                              width="20px"
                              src="/assets/send-icon.png"
                              style={{ paddingRight: "2px" }}
                            />
                            Send */}
                          </IconButton>
                        </Box>
                      </Box>
                      {/* <Box
                        height="100%"
                        style={{
                          justifyContent: "cemter",
                          alignItems: "center",
                          marginTop: "22px",
                        }}
                      >
                        <Button>
                          <img src="/assets/thumup.png" />
                        </Button>
                      </Box> */}
                    </Box>
                  </AppBar>
                </Grid>
              </Grid>
            </div>
          </Container>
          {/* <Grid item> */}

          {/* </Grid> */}
        </div>
      </div>
    </>
  );
};
export default ChatSectionDashboard;
