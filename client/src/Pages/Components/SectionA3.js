import React from "react";
import { useNavigate } from "react-router-dom";

// Visual Imports
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, Container } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

// End Visual Imports

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

const SectionA1 = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const handleNextPage = () => {
    // navigate("/auth");
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: for smooth scrolling
    });
  };
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          //   backgroundColor: "green",

          my: 6,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            width: "100%",

            backgroundColor: "#e5f3ff",
            borderRadius: "25px",
            height: "740px",
            [theme.breakpoints.down("md")]: {
              height: "740px",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              pt: 1,
              [theme.breakpoints.up("md")]: {
                fontSize: "42px",
              },
              [theme.breakpoints.down("md")]: {
                fontSize: "32px",
              },
              [theme.breakpoints.down("sm")]: {
                fontSize: "28px",
              },
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{ my: 2, fontSize: "inherit", fontWeight: "700", mt: 6 }}
            >
              Turn Conversations to Conversions
            </Typography>
          </Box>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                // background: "blue",
                [theme.breakpoints.down("sm")]: {
                  textAlign: "Left",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ ms: 2 }}>
                  {/* <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ my: 2, fontSize: "32px" }}
                  >
                    <Typography
                      component="span"
                      fontSize="inherit"
                      sx={{
                        // lineHeight: "5px",
                        textDecoration: "underline 2px",
                      }}
                    >
                      Never
                    </Typography>{" "}
                    Write Same Answer,
                    <Typography variant="h4">Again.</Typography>
                  </Typography> */}
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ my: 2, fontSize: "22px", lineHeight: "1.8" }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontSize: "inherit", lineHeight: "inherit" }}
                    >
                      MessengerGPT doesn’t just support but also
                    </Typography>
                    sells so you hit two birds with one stone.
                    <Typography
                      variant="h5"
                      sx={{ fontSize: "inherit", lineHeight: "inherit" }}
                    >
                      Supports Order Tracking
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontSize: "inherit", lineHeight: "inherit" }}
                    >
                      Upsells related Products or Services
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontSize: "inherit", lineHeight: "inherit" }}
                    >
                      Answers days to arrival
                    </Typography>
                  </Typography>
                  {/* <List sx={{ my: 2 }}>
                    <ListItem>
                      <Typography variant="h6">
                        Setup Your Chatbot in Minutes, Not Hours.
                      </Typography>
                    </ListItem>
                  </List> */}
                  {/* <Box
                    component="ul"
                    sx={{
                      listStyleType: "disc",
                      paddingLeft: 4,
                      margin: 0,
                      fontSize: "18px",
                    }}
                  >
                    <Box component="li">
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "inherit", my: 1 }}
                      >
                        Male or Female Natural Voices
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "inherit", my: 1 }}
                      >
                        Edit Your Conversation Script with Ease
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "inherit", my: 1 }}
                      >
                        Support All Languages
                      </Typography>
                    </Box>
                  </Box> */}

                  <Box sx={{ my: 4, pb: 6 }}>
                    <Button
                      variant="outlined"
                      sx={{
                        // backgroundColor: "#2196f3",
                        borderColor: "black",
                        color: "black",
                        borderRadius: "15px",
                        py: 2,
                        px: 2,
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "12px",
                        },
                      }}
                    >
                      Get Started
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={
                {
                  // background: "blue"
                }
              }
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/assets/social-media-post.png"
                  style={{ maxWidth: "100%", height: "450px" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default SectionA1;
