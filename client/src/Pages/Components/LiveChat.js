import React, { Component } from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
// import ReactDOM from "react-dom/client";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { Grid, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
// import { styled } from "@mui/material/styles";
import AspectRatio from "@mui/joy/AspectRatio";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const initializeFbSdk = (callback) => {
  window.fbAsyncInit = function () {
    window.FB.init({
      xfbml: true,
      version: "v16.0",
    });
    callback(); // Once SDK is initialized, call the callback
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};

const LiveChat = () => {
  const MessengerRef = useRef();

  useEffect(() => {
    // After initializing the SDK, show the chat dialog
    const afterInitialization = () => {
      if (window.FB) {
        window.FB.CustomerChat.show(true);
      }
    };

    initializeFbSdk(afterInitialization);

    MessengerRef.current.setAttribute("page_id", "122105349284001952");
    MessengerRef.current.setAttribute("attribution", "biz_inbox");
  }, []);

  return (
    <>
      <div id="fb-root"></div>
      <div
        ref={MessengerRef}
        id="fb-customer-chat"
        className="fb-customerchat"
        style={{ zIndex: 9999 }} // Ensuring high z-index
      ></div>
    </>
  );
};

export default LiveChat;
