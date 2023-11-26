import React from "react";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { Button, Img, Line, List, Text } from "components";
import QandASection from "./components/QandASection/QandASection";
import Messenger from "./components/Messenger";
import MessengerIntro from "./components/MessengerIntro";
// Context API
import { useContext } from "react";
import DataContext from "ContextAPI/DataState";

const ChatInterfacev3 = () => {
  const dataContext = useContext(DataContext);
  const navigate = useNavigate();
  const [MessengerOpen, setMessengerOpen] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  // Function to toggle overlay
  const toggleOverlay = () => {
    setIsOverlayActive(!isOverlayActive);
  };
  const openNewPage = () => {
    window.open("/subscription.html", "_blank");
  };
  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-center justify-end mx-auto w-full">
        <header className="bg-white-A700 flex md:gap-10 items-center justify-between px-10 md:px-5 py-4 rounded-tl-[20px] rounded-tr-[20px] shadow-bs w-full">
          <Img
            className="h-[46px] md:h-auto object-cover w-[54px]"
            src="/images/img_frame1000002929.png"
            alt="frame1000002929"
          />
          <div className="flex flex-col items-center justify-start w-auto">
            <Button
              className="cursor-pointer flex items-center justify-center min-w-[205px]"
              rightIcon={
                <Img
                  className="h-3.5 mt-0.5 mb-px ml-1.5"
                  src="/images/img_frame.svg"
                  alt="Frame"
                />
              }
              shape="round"
              color="deep_purple_A200_deep_purple_700"
              onClick={() => {
                openNewPage();
              }}
            >
              <div className="font-semibold text-center text-xs">
                Connect to FB - It’s FREE
              </div>
            </Button>
          </div>
        </header>
        <div className="flex flex-col font-lato items-start justify-start w-auto md:w-full mt-[20px]">
          <div className="bg-white-A700 flex md:flex-col flex-row md:gap-10 gap-20 items-start justify-start max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-10 w-full">
            <div className="flex flex-col h-[642px] md:h-auto items-center justify-start pb-5">
              <div className="flex flex-col gap-11 items-start justify-center max-w-[720px] w-full">
                <div className="flex flex-col gap-1 items-start justify-center w-full">
                  <div className="flex flex-col font-poppins items-start justify-start w-full">
                    <Text
                      className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-1.50px] w-full"
                      size="txtPoppinsSemiBold24"
                    >
                      {`About ${
                        dataContext.name && dataContext.name.length > 0
                          ? dataContext.name.charAt(0).toUpperCase() +
                            dataContext.name.slice(1)
                          : "<Your Business Name>"
                      }`}
                    </Text>
                  </div>
                  <Text
                    className="text-blue_gray-500 text-sm w-full"
                    size="txtLatoRegular14"
                  >
                    Below are answers to your questions to automate.
                  </Text>
                </div>
                <div>
                  {" "}
                  {/* Chat Section */}
                  <QandASection />
                </div>
              </div>
            </div>
            <div className="flex flex-col font-poppins gap-4 items-end justify-center w-auto">
              <div>
                {!MessengerOpen && <MessengerIntro />}
                {MessengerOpen && <Messenger />}
              </div>

              <Button
                className="common-pointer flex h-12 items-center justify-center w-12"
                // onClick={() => navigate("/landingpageone")}
                onClick={() => {
                  setMessengerOpen(!MessengerOpen);
                  console.log(!MessengerOpen);
                }}
                shape="circle"
                size="lg"
                color="purple_800_indigo_800"
              >
                <Img
                  className="h-5"
                  src="/images/img_component15.svg"
                  alt="componentFifteen"
                />
              </Button>
            </div>
          </div>
          <div className="bg-white-A700 flex flex-col gap-10 items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-20 w-full">
            <div className="flex flex-col items-center justify-start max-w-[1160px] mx-auto w-full">
              <Text
                className="leading-[170.00%] max-w-[1160px] md:max-w-full sm:text-2xl md:text-[26px] text-[28px] text-center text-gray-900"
                size="txtLatoBold28"
              >
                <>We&#39;ve helped over 10K businesses....</>
              </Text>
            </div>
            <List
              className="sm:flex-col flex-row gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-start max-w-[1160px] mx-auto w-full"
              orientation="horizontal"
            >
              <div className="bg-gray-100_01 flex flex-1 flex-col gap-5 items-start justify-start p-4 rounded-[12px] w-full">
                <div className="flex flex-row gap-4 items-center justify-center w-auto">
                  <Img
                    className="h-[60px] md:h-auto object-cover rounded w-[60px]"
                    src="/images/img_dp.png"
                    alt="dp"
                  />
                  <div className="flex flex-col gap-1 items-start justify-start w-auto">
                    <Text
                      className="bg-clip-text bg-gradient3  text-sm text-transparent w-auto"
                      size="txtLatoBold14"
                    >
                      Elisa Grant
                    </Text>
                    <Text
                      className="bg-clip-text bg-gradient3  text-transparent text-xs w-auto"
                      size="txtLatoRegular12"
                    >
                      Founder at FMF
                    </Text>
                  </div>
                </div>
                <Text
                  className="leading-[150.00%] max-w-[341px] md:max-w-full text-blue_gray-700 text-sm"
                  size="txtLatoMedium14"
                >
                  <span className="text-blue_gray-700 font-lato text-left font-medium">
                    This isn’t just a AI, it’s a{" "}
                  </span>
                  <span className="text-blue_gray-700 font-lato text-left font-bold">
                    24/7 Support
                  </span>
                  <span className="text-blue_gray-700 font-lato text-left font-medium">
                    {" "}
                    &{" "}
                  </span>
                  <span className="text-blue_gray-700 font-lato text-left font-bold">
                    Sales guru
                  </span>
                  <span className="text-blue_gray-700 font-lato text-left font-medium">
                    . ROI? 120%. Time? Saved. Competition? Cost? Crushed! Free.
                    Thank You.
                  </span>
                </Text>
                <div className="flex flex-row gap-2 items-center justify-center w-auto">
                  <div className="flex flex-row items-start justify-start w-auto">
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1.svg"
                        alt="starOne"
                      />
                    </div>
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_16x16.svg"
                        alt="starOne_One"
                      />
                    </div>
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_1.svg"
                        alt="starOne_Two"
                      />
                    </div>
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_2.svg"
                        alt="starOne_Three"
                      />
                    </div>
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_3.svg"
                        alt="starOne_Four"
                      />
                    </div>
                  </div>
                  <Text
                    className="text-blue_gray-700 text-xs w-auto"
                    size="txtLatoSemiBold12Bluegray700"
                  >
                    5.0 rating
                  </Text>
                </div>
              </div>
              <div className="bg-gray-100_01 flex flex-1 flex-col gap-5 items-start justify-start p-4 rounded-[12px] w-full">
                <div className="flex flex-row gap-4 items-center justify-center w-auto">
                  <Img
                    className="h-[60px] md:h-auto object-cover rounded w-[60px]"
                    src="/images/img_dp_60x60.png"
                    alt="dp"
                  />
                  <div className="flex flex-col gap-1 items-start justify-start w-auto">
                    <Text
                      className="bg-clip-text bg-gradient3  text-sm text-transparent w-auto"
                      size="txtLatoBold14"
                    >
                      Elisa Grant
                    </Text>
                    <Text
                      className="bg-clip-text bg-gradient3  text-transparent text-xs w-auto"
                      size="txtLatoRegular12"
                    >
                      Co-Founder of Timeful
                    </Text>
                  </div>
                </div>
                <Text
                  className="leading-[150.00%] max-w-[341px] md:max-w-full text-blue_gray-700 text-sm"
                  size="txtLatoMedium14"
                >
                  This is your own ChatGPT in Your Messenger for Free. No
                  writing the same answer again. Love how it emails me any new
                  questions to then learn right away.
                </Text>
                <div className="flex flex-row gap-2 items-center justify-center w-auto">
                  <div className="flex flex-row items-start justify-start w-auto">
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_4.svg"
                        alt="starOne"
                      />
                    </div>
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_5.svg"
                        alt="starOne_One"
                      />
                    </div>
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className=" h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_6.svg"
                        alt="starOne_Two"
                      />
                    </div>
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_7.svg"
                        alt="starOne_Three"
                      />
                    </div>
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_8.svg"
                        alt="starOne_Four"
                      />
                    </div>
                  </div>
                  <Text
                    className="text-blue_gray-700 text-xs w-auto"
                    size="txtLatoSemiBold12Bluegray700"
                  >
                    5.0 rating
                  </Text>
                </div>
              </div>
              <div className="bg-gray-100_01 flex flex-1 flex-col gap-5 items-start justify-start p-4 rounded-[12px] w-full">
                <div className="flex flex-row gap-4 items-center justify-center w-auto">
                  <Img
                    className="h-[60px] md:h-auto object-cover rounded w-[60px]"
                    src="/images/img_dp.png"
                    alt="dp"
                  />
                  <div className="flex flex-col gap-1 items-start justify-start w-auto">
                    <Text
                      className="bg-clip-text bg-gradient3  text-sm text-transparent w-auto"
                      size="txtLatoBold14"
                    >
                      Elisa Grant
                    </Text>
                    <Text
                      className="bg-clip-text bg-gradient3  text-transparent text-xs w-auto"
                      size="txtLatoRegular12"
                    >
                      CEO at SideSheets
                    </Text>
                  </div>
                </div>
                <Text
                  className="leading-[150.00%] max-w-[341px] md:max-w-full text-blue_gray-700 text-sm"
                  size="txtLatoMedium14"
                >
                  MessengerGPT isn’t another Ai, it’s a partner. Can answer any
                  question even better than I! I now spend my time on strategy,
                  not support.
                </Text>
                <div className="flex flex-row gap-2 items-center justify-center w-auto">
                  <div className="flex flex-row items-start justify-start w-auto">
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_9.svg"
                        alt="starOne"
                      />
                    </div>
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className=" h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_10.svg"
                        alt="starOne_One"
                      />
                    </div>
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_11.svg"
                        alt="starOne_Two"
                      />
                    </div>
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_12.svg"
                        alt="starOne_Three"
                      />
                    </div>
                    <div className="flex flex-col h-4 items-center justify-start w-4">
                      <Img
                        className="  h-4 rounded-bl-[1px] rounded-br-[1px] w-4"
                        src="/images/img_star1_13.svg"
                        alt="starOne_Four"
                      />
                    </div>
                  </div>
                  <Text
                    className="text-blue_gray-700 text-xs w-auto"
                    size="txtLatoSemiBold12Bluegray700"
                  >
                    5.0 rating
                  </Text>
                </div>
              </div>
            </List>
          </div>
          <div className="bg-gray-100_02 flex flex-col gap-10 items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-20 w-full">
            <div className="flex flex-col font-lato items-center justify-start max-w-[1160px] mx-auto w-full">
              <Text
                className="bg-clip-text bg-gradient3  leading-[170.00%] text-2xl md:text-[22px] text-center text-transparent sm:text-xl"
                size="txtLatoBold24"
              >
                <>
                  Integrate AI with your Messenger to Turn To
                  <br /> Support As Your Strength, Not Weakness.
                </>
              </Text>
            </div>
            <Button
              className="bg-transparent cursor-pointer flex items-center justify-center min-w-[309px] outline outline-[2px] rounded-[28px]"
              rightIcon={
                <Img
                  className="h-6 ml-3"
                  src="/images/img_icfluentarrowforward24filled_1.png"
                  alt="ic_fluent_arrow_forward_24_filled 1"
                />
              }
              color="white_A700"
              size="lg"
              variant="fill"
              onClick={() => {
                openNewPage();
              }}
            >
              <div className="!text-deep_purple-A200 deep_purple_A200_deep_purple_700_border font-poppins font-semibold leading-[normal] text-base text-left">
                Connect to FB - It’s FREE
              </div>
            </Button>
          </div>
          <div className="bg-white-A700 flex flex-col items-center justify-between max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-5 w-full">
            <Img
              className="h-10 md:h-auto object-cover w-10"
              src="/images/img_frame1000002929.png"
              alt="logo"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterfacev3;
