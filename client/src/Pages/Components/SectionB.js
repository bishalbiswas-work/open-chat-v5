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

const SectionB = () => {
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
      <Box sx={{ width: "100%" }}>
        {" "}
        <Box
          sx={{
            width: "100%",
            // backgroundColor: "yellow",

            my: 6,
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              width: "100%",
              backgroundColor: "#F5F5F7",
              borderRadius: "25px",
              height: "540px",
              [theme.breakpoints.down("md")]: {
                height: "1000px",
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
                sx={{ my: 2, fontSize: "inherit" }}
              >
                Turn Conversation to Scripts
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
                    style={{ maxWidth: "100%", height: "300px" }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  // background: "blue",
                  [theme.breakpoints.down("md")]: {
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
                  <Box>
                    <Typography
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
                    </Typography>
                    {/* <List sx={{ my: 2 }}>
                    <ListItem>
                      <Typography variant="h6">
                        Setup Your Chatbot in Minutes, Not Hours.
                      </Typography>
                    </ListItem>
                  </List> */}
                    <Box
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
                    </Box>

                    <Box sx={{ my: 4, pb: 6 }}>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: "black",
                          color: "black",
                          borderRadius: "15px",

                          py: 1,
                          px: 4,
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
            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
  );
};

export default SectionB;
