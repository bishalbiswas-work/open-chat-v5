import React from "react";

// Appbar Imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
// End Appbar

const Appbar1 = () => {
  const navigate = useNavigate();
  const handleNextPage = () => {
    navigate("/auth");
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1, pb: 2 }}>
        <Container maxWidth="xl">
          <AppBar
            position="static"
            sx={{ backgroundColor: "transparent", boxShadow: "none" }}
          >
            <Toolbar>
              {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
              <Box style={{ height: "120px" }}></Box>
              {/* <Typography
                variant="h6"
                component="div"
               
              >
                MessengerGPT
              </Typography> */}
              <IconButton>
                <img width="50px" src="/assets/messengergpt-icon.png" />
              </IconButton>
              <Box sx={{ flexGrow: 1 }}></Box>
              {/* <Button
                variant="contained"
                size="large"
                // onClick={() => handleNextPage()}
                // sx={{ borderRadius: "15px", background: "#2196f3" }}
                style={{
                  fontSize: "12px",
                  background:
                    "linear-gradient(180deg, rgb(105.08, 50, 131) 0%, rgb(50.16, 50.16, 130.74) 100%)",
                  padding: "10px 25px", // Adjust padding as needed
                  borderRadius: "8px", // Adjust border radius as needed
                }}
              >
                Get Started It's Free!
              </Button> */}
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
    </div>
  );
};

export default Appbar1;
