import react from "react";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { Button, Img, Line, List, Text, Input } from "../../../../components";

// Context API
import { useContext } from "react";
import DataContext from "ContextAPI/DataState";

const MessengerIntro = () => {
  const dataContext = useContext(DataContext);
  const navigate = useNavigate();
  return (
    <>
      <>
        <div className="bg-white-A700 flex flex-col gap-8 h-[578px] md:h-auto items-center justify-start pt-[68px] rounded-[12px] shadow-bs1 w-[360px]">
          <div className="flex flex-col gap-1 items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center px-5 w-full">
              <Text
                className="bg-clip-text bg-gradient3  text-base text-center text-transparent w-full"
                size="txtPoppinsExtraBold16"
              >
                MessengerGPT
              </Text>
            </div>
            <div className="flex flex-col font-lato items-center justify-center px-5 w-full">
              <Text
                className="text-center text-gray-500 text-xs w-full"
                size="txtLatoSemiBold12"
              >
                <>
                  {`Chat with ${
                    dataContext.name && dataContext.name.length > 0
                      ? dataContext.name.charAt(0).toUpperCase() +
                        dataContext.name.slice(1)
                      : "<Your Business Name>"
                  }`}
                  ;
                </>
              </Text>
            </div>
          </div>
          <div className="flex flex-col font-lato gap-8 items-center justify-center w-full">
            <div className="h-60 md:h-[204px] p-2.5 relative w-60">
              <div className="absolute md:h-[204px] h-[207px] inset-[0] justify-center m-auto w-[88%]">
                <div className="flex flex-col h-full items-center justify-start m-auto w-full">
                  <div className="flex flex-col gap-1.5 items-center justify-start w-full">
                    <div
                      className="bg-cover bg-no-repeat flex flex-col h-[201px] items-start justify-start w-full"
                      style={{
                        backgroundImage: "url('images/img_group2.svg')",
                      }}
                    >
                      <Img
                        className="h-[38px] mb-[139px] mt-5 w-[38px]"
                        src="/images/img_group.svg"
                        alt="group"
                      />
                    </div>
                    <Img
                      className="h-px"
                      src="/images/img_floor.svg"
                      alt="floor"
                    />
                  </div>
                </div>
                <div className="absolute flex flex-row h-max inset-[0] items-end justify-between m-auto w-[84%]">
                  <Img
                    className="h-[25px] mt-[175px]"
                    src="/images/img_group_blue_gray_900.svg"
                    alt="group_One"
                  />
                  <div className="flex flex-col items-center justify-start">
                    <div
                      className="bg-cover bg-no-repeat flex flex-col gap-1.5 h-[200px] items-start justify-center p-[11px] w-full"
                      style={{
                        backgroundImage:
                          "url('/images/img_group_blue_gray_700_01.svg')",
                      }}
                    >
                      <div className="h-36 md:h-[157px] mt-3.5 relative w-[99%]">
                        <div className="absolute flex flex-col gap-[7px] h-full inset-[0] items-end justify-center m-auto w-full">
                          <div className="h-[115px] relative w-full">
                            <div className="flex flex-col h-full items-center justify-start m-auto w-full">
                              <div className="flex flex-col gap-[9px] items-center justify-start w-full">
                                <div className="flex flex-row items-start justify-evenly w-full">
                                  <div className="flex flex-col items-start justify-start w-[96%]">
                                    <div className="flex flex-row gap-[27px] items-start justify-start ml-0.5 md:ml-[0] w-[58%] md:w-full">
                                      <Img
                                        className="h-[3px] w-0.5"
                                        src="/images/img_vector_blue_gray_900.svg"
                                        alt="vector"
                                      />
                                      <Img
                                        className="h-[3px]"
                                        src="/images/img_group_blue_gray_900_3x12.svg"
                                        alt="group_Two"
                                      />
                                    </div>
                                    <Img
                                      className="h-px md:ml-[0] ml-[21px] mt-[3px]"
                                      src="/images/img_floor.svg"
                                      alt="vector_One"
                                    />
                                    <div className="flex flex-row items-start justify-evenly mt-5 w-full">
                                      <Img
                                        className="h-[21px] w-[21px]"
                                        src="/images/img_group_gray_300.svg"
                                        alt="group_Three"
                                      />
                                      <div
                                        className="bg-cover bg-no-repeat flex flex-col h-[22px] items-end justify-start mt-0.5 p-[3px] w-[67%]"
                                        style={{
                                          backgroundImage:
                                            "url('/images/img_group3.svg')",
                                        }}
                                      >
                                        <div className="flex flex-col items-center justify-start w-[86%] md:w-full">
                                          <Img
                                            className="h-px"
                                            src="/images/img_vector_white_a700.svg"
                                            alt="vector_Two"
                                          />
                                          <Img
                                            className="h-px mt-0.5"
                                            src="/images/img_vector_white_a700.svg"
                                            alt="vector_Three"
                                          />
                                          <Img
                                            className="h-px mt-0.5"
                                            src="/images/img_vector_white_a700.svg"
                                            alt="vector_Four"
                                          />
                                          <Img
                                            className="h-px mt-0.5"
                                            src="/images/img_vector_white_a700.svg"
                                            alt="vector_Five"
                                          />
                                          <Img
                                            className="h-px mt-0.5"
                                            src="/images/img_vector_white_a700.svg"
                                            alt="vector_Six"
                                          />
                                          <Img
                                            className="h-px mt-0.5"
                                            src="/images/img_vector_white_a700.svg"
                                            alt="vector_Seven"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-end md:ml-[0] ml-[57px] w-[17%] md:w-full">
                                      <Img
                                        className="h-px"
                                        src="/images/img_vector_gray_300.svg"
                                        alt="vector_Eight"
                                      />
                                      <Img
                                        className="h-px"
                                        src="/images/img_group_deep_orange_300_01_1x3.svg"
                                        alt="group_Four"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center justify-start w-[2%]">
                                    <div className="bg-blue_gray-900 h-px rounded-[50%] w-px"></div>
                                    <Img
                                      className="h-px w-px"
                                      src="/images/img_floor.svg"
                                      alt="vector_Ten"
                                    />
                                    <Img
                                      className="h-px w-px"
                                      src="/images/img_floor.svg"
                                      alt="vector_Eleven"
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-row items-end justify-evenly w-full">
                                  <Img
                                    className="h-[21px] mt-[31px] w-[21px]"
                                    src="/images/img_group_gray_300_21x21.svg"
                                    alt="group_Five"
                                  />
                                  <div className="flex flex-col items-start justify-start w-[50px]">
                                    <Img
                                      className="h-[21px] ml-7 md:ml-[0] w-[21px]"
                                      src="/images/img_vector.svg"
                                      alt="vector_Twelve"
                                    />
                                    <div
                                      className="bg-cover bg-no-repeat flex flex-col h-3.5 items-end justify-start mt-[11px] p-[3px] w-[94%] md:w-full"
                                      style={{
                                        backgroundImage:
                                          "url('/images/img_group3.svg')",
                                      }}
                                    >
                                      <div className="flex flex-col items-center justify-start w-[86%] md:w-full">
                                        <Img
                                          className="h-px"
                                          src="/images/img_vector_white_a700.svg"
                                          alt="vector_Thirteen"
                                        />
                                        <Img
                                          className="h-px mt-0.5"
                                          src="/images/img_vector_white_a700.svg"
                                          alt="vector_Fourteen"
                                        />
                                        <Img
                                          className="h-px mt-0.5"
                                          src="/images/img_vector_white_a700.svg"
                                          alt="vector_Fifteen"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-end md:ml-[0] ml-[33px] w-[24%] md:w-full">
                                      <Img
                                        className="h-px"
                                        src="/images/img_vector_gray_300.svg"
                                        alt="vector_Sixteen"
                                      />
                                      <Img
                                        className="h-px"
                                        src="/images/img_group_1x3.svg"
                                        alt="group_Six"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-[27%] flex flex-row gap-1.5 inset-x-[0] items-start justify-between mx-auto w-[96%]">
                              <div
                                className="bg-cover bg-no-repeat flex flex-col h-[17px] items-start justify-end p-[3px]"
                                style={{
                                  backgroundImage:
                                    "url('/images/img_group3.svg')",
                                }}
                              >
                                <div className="flex flex-col items-center justify-start w-[81%] md:w-full">
                                  <Img
                                    className="h-px"
                                    src="/images/img_vector_white_a700.svg"
                                    alt="vector_Seventeen"
                                  />
                                  <Img
                                    className="h-px mt-0.5"
                                    src="/images/img_vector_white_a700.svg"
                                    alt="vector_Eighteen"
                                  />
                                  <Img
                                    className="h-px mt-0.5"
                                    src="/images/img_vector_white_a700.svg"
                                    alt="vector_Nineteen"
                                  />
                                  <Img
                                    className="h-px mt-0.5"
                                    src="/images/img_vector_white_a700.svg"
                                    alt="vector_Twenty"
                                  />
                                </div>
                              </div>
                              <Img
                                className="h-[18px] w-[17px]"
                                src="/images/img_group_deep_orange_300_01.svg"
                                alt="group_Seven"
                              />
                            </div>
                          </div>
                          <Img
                            className="h-[21px] w-[21px]"
                            src="/images/img_vector.svg"
                            alt="vector_TwentyOne"
                          />
                        </div>
                        <Img
                          className="absolute bottom-[0] h-[18px] right-[3%] w-[17px]"
                          src="/images/img_group_deep_orange_300_01_18x17.svg"
                          alt="group_Eight"
                        />
                        <div
                          className="absolute bg-cover bg-no-repeat bottom-[0] flex flex-col h-[17px] items-start justify-end left-[0] p-[3px] w-[64%]"
                          style={{
                            backgroundImage: "url('/images/img_group3.svg')",
                          }}
                        >
                          <div className="flex flex-col items-center justify-start w-[81%] md:w-full">
                            <Img
                              className="h-px"
                              src="/images/img_vector_white_a700.svg"
                              alt="vector_TwentyTwo"
                            />
                            <Img
                              className="h-px mt-0.5"
                              src="/images/img_vector_white_a700.svg"
                              alt="vector_TwentyThree"
                            />
                            <Img
                              className="h-px mt-0.5"
                              src="/images/img_vector_white_a700.svg"
                              alt="vector_TwentyFour"
                            />
                            <Img
                              className="h-px mt-0.5"
                              src="/images/img_vector_white_a700.svg"
                              alt="vector_TwentyFive"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="bg-cover bg-no-repeat flex flex-col h-2.5 items-start justify-end mb-0.5 p-1 w-[63%] md:w-full"
                        style={{
                          backgroundImage: "url('/images/img_group3.svg')",
                        }}
                      >
                        <Img
                          className="h-px"
                          src="/images/img_vector_white_a700.svg"
                          alt="vector_TwentySix"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Img
                className="absolute bottom-[14%] h-[153px] left-[4%]"
                src="/images/img_bot.svg"
                alt="bot"
              />
            </div>
            <div className="flex flex-col items-center justify-center px-5 w-full">
              <Text
                className="bg-clip-text bg-gradient3  leading-[150.00%] text-center text-sm text-transparent"
                size="txtLatoSemiBold14"
              >
                <>
                  Test it for Yourself by clicking
                  <br />
                  Your messenger button below!
                </>
              </Text>
            </div>
          </div>
          <Img
            className="h-[90px] md:h-auto object-cover w-38 sm:w-full"
            src="/images/img_vector_90x112.png"
            alt="vector_TwentySeven"
          />
        </div>
      </>
    </>
  );
};
export default MessengerIntro;
