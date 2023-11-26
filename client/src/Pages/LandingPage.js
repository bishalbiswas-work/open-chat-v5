import React from "react";
import Appbar1 from "./Components/Appbar1";
// import HeroSection from "./Components/HeroSection/HeroSection";
import HeroSectionv2 from "./Components/HeroSectoinv2";
import SectionFooter from "./Components/SectionFooter";
import SectionB from "./Components/SectionB";
import SectionA1 from "./Components/SectionA1";
import SectionB2 from "./Components/SectionB2";
import SectionC1 from "./Components/SectionC1";
import ChatSection from "./Components/ChatSection";
import Testimonial from "./Components/Testimonial";
import { Container } from "@mui/material";
import NewTest from "./Components/NewTest";
import Multilingual from "./Components/Multilingual";
import How from "./Components/How";
// import SectionA2 from "./Components/SectionA2";
const LandingPage = () => {
  return (
    <>
      <Appbar1 />
      {/* <HeroSection /> */}
      <HeroSectionv2 />
      <SectionA1 />
      <SectionB2 />
      <SectionC1 />
      {/*  */}
      {/* <SectionB /> */}
      <Multilingual />
      <How />
      <ChatSection />
      {/* <Testimonial /> */}
      <NewTest />
      <SectionFooter />
    </>
  );
};
export default LandingPage;
