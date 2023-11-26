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
import Link from "@mui/material/Link";

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

const SectionFooter = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const onClickStart = () => {
    // navigate("/auth");
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: for smooth scrolling
    });
  };

  return (
    <div sx={{ height: "" }}>
      <Box width="100%" height="200px" textAlign="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="350px"
          width="700px"
          marginLeft="auto"
          marginRight="auto"
          borderRadius="700px 700px 0 0" // Half-circle top
          color="white"
          style={{
            background:
              "linear-gradient(180deg, rgb(105.08, 50, 131) 0%, rgb(50.16, 50.16, 130.74) 100%)",
          }}
        >
          <Box
            style={{
              textAlign: "center",
              padding: "80px 10px",
              marginTop: "-88px",
            }}
          >
            <Typography style={{ fontSize: "38px", fontWeight: "700" }}>
              4,238,486,121
            </Typography>
            <Typography style={{ fontSize: "18px", fontWeight: "700" }}>
              conversations automated
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          bottom: "0",
          // backgroundColor: "grey",
          backgroundColor: "#1E2833",
          // borderRadius: "25px 25px 0px 0px",
        }}
      >
        <Container
          // position="absolute"
          // bottom="0px"

          maxWidth="xl"
          sx={{
            // marginTop: "150px",
            width: "100%",
            height: "440px",

            [theme.breakpoints.down("md")]: {
              height: "340px",
            },
          }}
        >
          <Box sx={{ width: "100%", textAlign: "center", pt: 1 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ my: 2, fontSize: "18px", color: "grey", marginTop: "50px" }}
              style={{
                fontFamily: "DM Sans, sans-serif ",
              }}
            >
              Are you ready to Free Yourself?
            </Typography>
            <Typography
              variant="h3"
              gutterBottom
              style={{
                fontFamily: "DM Sans, sans-serif ",
              }}
              sx={{ my: 2, fontSize: "28px", color: "lightgrey" }}
            >
              Let's get started
            </Typography>

            <Button
              onClick={() => onClickStart()}
              variant="contained"
              style={{
                fontFamily: "Inter, sans-serif ",
              }}
              sx={{
                backgroundColor: "#2196f3",
                borderRadius: "15px",
                py: 1,
                px: 4,
                textTransform: "none",
                background:
                  "linear-gradient(180deg, rgb(105.08, 50, 131) 0%, rgb(50.16, 50.16, 130.74) 100%)",

                [theme.breakpoints.down("sm")]: {
                  fontSize: "12px",
                },
              }}
            >
              Get Started
            </Button>
          </Box>
          {/* <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "130px",
              mt: 1,
            }}
          >
            <Grid item xs={12} md={6} sx={{ background: "blue" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ my: 2, fontSize: "16px" }}
                >
                  Affliate
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                background: "blue",
                [theme.breakpoints.down("sm")]: {
                  textAlign: "",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ my: 2, fontSize: "16px" }}
                >
                  Dicord
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ background: "blue" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ my: 2, fontSize: "16px" }}
                >
                  Affliate
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                background: "blue",
                [theme.breakpoints.down("sm")]: {
                  textAlign: "",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ my: 2, fontSize: "16px" }}
                >
                  Dicord
                </Typography>
              </Box>
            </Grid>
          </Grid> */}
          <Box sx={{ width: "100%", textAlign: "center", pt: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                mb: 2,
                color: "lightgrey",
              }}
            >
              <Link href="#" color="inherit">
                Affiliate
              </Link>
              <Link href="#" color="inherit">
                Discord
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                mb: 2,
                color: "lightgrey",
              }}
            >
              <Link href="#" color="inherit">
                Privacy Policy
              </Link>
              <Link href="#" color="inherit">
                Terms & Conditions
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              pt: 1,
              color: "grey",
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{ my: 2, fontSize: "18px" }}
            >
              Copyright &#169; 2023 All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default SectionFooter;
