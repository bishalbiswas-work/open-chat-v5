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

const SectionB2 = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleNextPage = () => {
    // navigate("/auth");
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: for smooth scrolling
    });
  };
  const onClickGetStarted = () => {
    console.log("Get Started");
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
              backgroundColor: "#b3daff",
              borderRadius: "25px 25px 0 0",
              height: "840px",
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
                  fontSize: "48px",
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
                sx={{
                  my: 2,
                  fontSize: "inherit",
                  marginTop: "50px",
                  fontWeight: "bold",
                  fontFamily: "Helvetica-Bold, sans-serif",
                }}
              >
                Never Lose Guest Customers, Again.
              </Typography>
            </Box>
            <Grid
              container
              // spacing={2}
              sx={{
                display: "flex",
                alignItems: "center",
                // height: "100%",
              }}
            >
              <Grid
                item
                xs={12}
                md={8}
                sx={
                  {
                    // background: "blue"
                  }
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="/assets/Message Thread.png"
                    style={{ maxWidth: "100%", height: "550px" }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      height: "100px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: "Poppins, sans-serif !important",
                        fontSize: "22px",
                        fontWeight: "bold",
                      }}
                    >
                      Conversation will now continue on email when connection
                      drops
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
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
                    flexDirection: { md: "column" },
                    alignItems: "center",
                    justifyContent: "center",
                    // overflow: "hidden",
                  }}
                >
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ my: 2, fontSize: "22px", lineHeight: "1.8" }}
                  >
                    <Typography variant="span" style={{ fontWeight: "bold" }}>
                      Every Guest Counts:{" "}
                    </Typography>
                    MessengerGPT makes sure their first visit isn't their
                    <Typography
                      variant="h5"
                      sx={{ fontSize: "inherit", lineHeight: "inherit" }}
                    >
                      last with immediate email capture
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontSize: "inherit", lineHeight: "inherit" }}
                    >
                      Your reply automatically goes to their email as well!
                    </Typography>
                  </Typography>

                  <Box sx={{ my: 4, pb: 6, textAlign: "center" }}>
                    <img
                      src="/assets/boy_with_loudspeaker.png"
                      style={{ maxWidth: "100%", height: "350px" }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>

          <Container
            maxWidth="xl"
            onClick={() => {
              handleNextPage();
            }}
            style={{
              background: "#0084FF",
              height: "80px",
              textAlign: "center",
              borderRadius: "0 0 25px 25px",
            }}
          >
            <Typography
              // variant="outlined"
              sx={{
                borderColor: "black",
                color: "white",
                borderRadius: "15px",

                py: 3,
                px: 4,
                [theme.breakpoints.down("sm")]: {
                  fontSize: "12px",
                },
              }}
            >
              Get Started
            </Typography>
          </Container>
        </Box>
      </Box>
    </div>
  );
};

export default SectionB2;
