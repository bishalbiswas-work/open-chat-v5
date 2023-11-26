import React from "react";
import { useState, useEffect } from "react";

const Signup_Sidesection = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("pages/signup-sidesection.html")
      .then((response) => response.text())
      .then((data) => {
        setHtmlContent(data);
      });
  }, []);

  return (
    <div>
      <div>
        {/* <h1>Home Page</h1> */}

        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <toggleFaq />
      </div>
    </div>
  );
};
export default Signup_Sidesection;
