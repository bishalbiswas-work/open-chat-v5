import React from "react";
import { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";

const Suscription = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("/pages/testimonial.html")
      .then((response) => response.text())
      .then((data) => {
        setHtmlContent(data);
      });
  }, []);

  return (
    <div>
      <Container maxWidth="xl">
        {/* <h1>Home Page</h1> */}

        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <toggleFaq />
        <Box style={{ height: "100px" }}></Box>
      </Container>
    </div>
  );
};
export default Suscription;
