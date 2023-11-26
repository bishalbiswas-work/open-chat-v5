import React from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// Components Imports
import QandADisplay from "./Components/QandADisplayv2";
import ContextFeed from "./Components/ContentFeed";
import ChatSectionDashboard from "./Components/ChatSectionDashboard";
// End Component Impots
// ContextAPI
import { useContext } from "react";
// import DataContext from "../../ContextAPI/DataState";
import DataContext from "../ContextAPI/DataState";
// ContextAPI End
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  padding: "25px",
  borderRadius: "15px",
  color: theme.palette.text.secondary,
}));
const ChatInterface_v2 = () => {
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const chatSectionHeight = "1200px";
  const content = [
    {
      question: "What is MUI?",
      ans: "MUI is a popular React UI framework.",
    },
    {
      question: "How to use MUI?",
      ans: "You can use MUI by installing it and then using its components in your React apps.",
    },
    {
      question: "How to use MUI?",
      ans: "You can use MUI by installing it and then using its components in your React apps.",
    },
    {
      question: "How to use MUI?",
      ans: "You can use MUI by installing it and then using its components in your React apps.",
    },
    {
      question: "How to use MUI?",
      ans: "You can use MUI by installing it and then using its components in your React apps.",
    },
  ];
  const openNewPage = () => {
    window.open("/subscription.html", "_blank");
  };
  return (
    <>
      {/* <Container> */}
      <Box sx={{ flexGrow: 1, p: 2, background: "#e8ecf3" }}>
        <header>
          <div style={{ display: "flex" }}>
            <div>
              <a href="/">
                <img src="/assets/logo.png" alt="logo" />
              </a>
            </div>
            <div />
            <div />
          </div>
        </header>
        <Grid container spacing={2} sx={{ padding: "1rem 8rem" }}>
          <Grid item xs={8} sx={{ height: "100%" }}>
            <Box>
              <Grid
                container
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Grid item xs={4}>
                  <img src="/assets/ai-powered-marketing-tools-abstract-JwxvmKBRxh.png" />
                </Grid>
                <Grid
                  style={{ display: "flex", alignItems: "center" }}
                  item
                  xs={6}
                >
                  <Box sx={{}}>
                    <Typography
                      sx={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        marginLeft: "-3rem",
                      }}
                    >
                      Learning
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ height: "20px" }}></Box>
            <Box
              sx={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <Box sx={{ marginLeft: "10px" }}>
                <Typography
                  sx={{
                    mb: 2,
                    fontSize: "22px",
                    fontWeight: "500",
                    color: "#170F49",
                  }}
                >
                  {`About ${
                    (dataContext.name?.charAt(0)?.toUpperCase() ?? "") +
                    (dataContext.name?.slice(1) ?? "")
                  }`}
                </Typography>
              </Box>
              <Grid
                container
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                spacing="2"
              >
                <Grid style={{ flexGrow: 1 }} item xs={12}>
                  <Item>
                    <QandADisplay content={content} />
                  </Item>
                </Grid>
                <Grid style={{ flexGrow: 1 }} item xs={12}>
                  <Item>
                    <ContextFeed />
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box>
              <Grid
                container
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Grid style={{}} item xs={4}>
                  <img src="/assets/checklist-hCVfuDQ76H.png" />
                </Grid>
                <Grid
                  style={{ display: "flex", alignItems: "center" }}
                  item
                  xs={6}
                >
                  <Box sx={{}}>
                    <Typography
                      sx={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        marginLeft: "2rem",
                      }}
                    >
                      Testing
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ height: "20px" }}></Box>
            <ChatSectionDashboard />
            <Box>
              <Button
                style={{
                  background: "black",
                  padding: "15px",
                  borderRadius: "100px",
                  marginLeft: "20px",
                  marginTop: "20px",
                }}
              >
                <img
                  style={{ width: "30px" }}
                  src="/assets/messanger-icon.png"
                />
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              xs={3}
            >
              {/* <Item> */}
              <img src="/assets/Trustpilot.png" />
              {/* </Item> */}
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              xs={4}
            >
              <img src="/assets/review 1.png" />
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              xs={4}
            >
              <img src="/assets/review 2.png" />
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ height: "50px" }}></Box>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            position="fixed" // Set the position to fixed
            bottom="0" // Position the box at the bottom
            width="100%" // Make the box full width so the button remains centered
            sx={{
              background: "white",
              paddingTop: "15px",
              paddingBottom: "10px",
            }}
          >
            <Button
              display="flex"
              variant="contained"
              alignItems="center"
              // href="https://buy.stripe.com/bIY02p18J2Ez9tS3co"
              onClick={() => {
                openNewPage();
              }}
              //   onClick={() => handleSelectPage(selectedCountry)}
              sx={{
                // backgroundColor: "#2196f3",
                background: "linear-gradient(90deg, #E91E63 0%, #9C27B0 100%)",
                borderRadius: "15px",
                py: 1,
                px: 4,
              }}
            >
              <Typography style={{ fontSize: "12px", marginRight: "10px" }}>
                Connect AI to Messager For Free
              </Typography>
              <Box sx={{ paddingTop: "5px" }}>
                <img display="block" src="/assets/messenger-icon.png" />
              </Box>
            </Button>
          </Box>
        </Grid>

        {/* </Grid> */}
      </Box>
      {/* </Container> */}
    </>
  );
};

export default ChatInterface_v2;
