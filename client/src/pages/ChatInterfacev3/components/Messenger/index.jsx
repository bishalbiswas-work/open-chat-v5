import react from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Img, Line, List, Text, Input } from "../../../../components";

//
import axios from "axios";
import { Dot } from "react-animated-dots";
//
import { useContext } from "react";
import DataContext from "ContextAPI/DataState";
const Messenger = () => {
  // Base Url
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  //
  const dataContext = useContext(DataContext);
  const navigate = useNavigate();
  // Data Processing ====================================
  const forms = new Array(5).fill(null);

  // const [messages, setMessages] = useState([
  //   {
  //     sender: "bot",
  //     text: `Hello! I am ${dataContext.name} AI, Ask me any questions!`,
  //   },
  //   {
  //     sender: "user",
  //     text: `Hello! I am ${dataContext.name} AI, Ask me any questions!`,
  //   },
  //   {
  //     sender: "bot",
  //     text: `Hello! I am ${dataContext.name} AI, Ask me any questions!`,
  //   },
  //   {
  //     sender: "bot",
  //     text: `Hello! I am ${dataContext.name} AI, Ask me any questions!`,
  //   },
  //   {
  //     sender: "bot",
  //     text: `Hello! I am ${dataContext.name} AI, Ask me any questions!`,
  //   },
  //   {
  //     sender: "bot",
  //     text: `Hello! I am ${dataContext.name} AI, Ask me any questions!`,
  //   },
  //   {
  //     sender: "bot",
  //     text: `Hello! I am ${dataContext.name} AI, Ask me any questions!`,
  //   },
  //   {
  //     sender: "bot",
  //     text: `Hello! I am ${dataContext.name} AI, Ask me any questions!`,
  //   },
  // ]);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hi 👋 I’m ${
        (dataContext.name?.charAt(0)?.toUpperCase() ?? "") +
        (dataContext.name?.slice(1) ?? "")
      }, ask me anything about ${
        (dataContext.name?.charAt(0)?.toUpperCase() ?? "") +
        (dataContext.name?.slice(1) ?? "")
      }!`,
    },
    // {
    //   sender: "bot",
    //   text: "By the way, did you know you can have your own custom GPT connected to your messenger?",
    // },
    {
      sender: "bot",
      text: "By the way, did you know you can connect your FB messenger with custom GPT?",
    },
  ]);

  const [input, setInput] = useState("");
  const [msgGen, setMsgGen] = useState(false);
  const messagesEndRef = useRef(null);
  const [profileUrl, setProfileUrl] = useState("");

  const [isSelected, setIsSelected] = useState(false);

  const scrollToBottom = () => {
    if (isSelected) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages, isSelected]);

  const handleSubmit = async () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "user", text: input }]);
      //   const userinput = JSON.stringify(messages);
      console.log(messages.slice(-4));
      //   const submitData = {
      //     userQuestion: userinput,
      //   };
      // Extract the last four messages
      const lastFourMessages = messages.slice(-4).map((msg) => msg.text);

      // Determine the properties based on the length of lastFourMessages
      const secondLastMsg =
        lastFourMessages.length >= 2
          ? lastFourMessages[lastFourMessages.length - 2]
          : "";
      const thirdLastMsg =
        lastFourMessages.length >= 3
          ? lastFourMessages[lastFourMessages.length - 3]
          : "";
      const fourthLastMsg =
        lastFourMessages.length >= 4 ? lastFourMessages[0] : "";

      // Prepare the submit data
      const submitData = {
        userQuestion: input,
        secondLastMsg,
        thirdLastMsg,
        fourthLastMsg,
      };

      console.log(submitData);

      const reply = await getResponse(submitData, dataContext.authToken);
      //   console.log(reply);
      //   setMessages((prev) => [
      //     ...prev,
      //     { sender: "bot", text: reply.data.response },
      //   ]);
      // If messages count is more than 3, add the additional message
      if (reply) {
        // if (messages.length > 3) {
        //   setMessages((prev) => [
        //     ...prev,

        //     { sender: "bot", text: reply.data.response },
        //     {
        //       sender: "bot",
        //       text: "Sorry, due to free trial limitation, I wasn’t able to go over all your history to know the answer to your question. Could you please upgrade so I can learn everything?",
        //     },
        //   ]);
        // } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: reply.data.response },
        ]);
        // }
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Error! Unable to connect!" },
        ]);
      }
      setInput("");
      dataContext.setMessagesLPFunction({ data: messages });
      setMsgGen(false);
    }
  };

  const getResponse = async (submitData, bearerToken) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/get-response`,
        // "http://localhost:5000/api/get-response",

        submitData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`, // Added this line
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  // Data End Processing ================================
  return (
    <>
      <>
        {" "}
        {/* <div className="flex flex-col font-dmsans gap-4 items-end justify-center w-auto"> */}
        <div className="flex flex-col h-[578px] md:h-auto items-start justify-start shadow-bs1 w-auto">
          <div className="bg-white-A700 flex flex-row items-start justify-between p-4 rounded-tl-[12px] rounded-tr-[12px] w-[360px]">
            <div className="flex flex-col items-start justify-start w-auto">
              <div className="flex flex-row gap-3 items-center justify-start w-auto">
                <Button
                  className="flex h-11 items-center justify-center rounded-[50%] w-11"
                  shape="circle"
                  color="gray_50_01"
                  variant="fill"
                >
                  <Img
                    className="h-6"
                    src={
                      dataContext.profileUrl
                        ? dataContext.profileUrl
                        : "/images/img_bot_44x44.png"
                    }
                    alt="bot"
                  />
                </Button>
                <div className="flex flex-col gap-0.5 items-start justify-start w-auto">
                  <Text
                    className="text-gray-900_01 text-sm w-auto"
                    size="txtDMSansBold14"
                  >
                    {/* {dataContext.name
                      ? dataContext.name
                      : "<Your Business Name>"} */}
                    {dataContext.name && dataContext.name.length > 0
                      ? dataContext.name.charAt(0).toUpperCase() +
                        dataContext.name.slice(1)
                      : "<Your Business Name>"}
                  </Text>
                  <div className="flex flex-col items-center justify-start w-auto">
                    <Text
                      className="text-gray-600 text-xs w-auto"
                      size="txtDMSansMedium12"
                    >
                      Powered by Messenger
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            {/* <Img
              className="h-8 w-[76px]"
              src="/images/img_frame1000003107.svg"
              alt="frame1000003107"
            /> */}
          </div>
          <Line className="bg-black-900_0c h-px w-full" />
          <div
            className="bg-white-A700 flex flex-col md:gap-10 gap-[163px] h-[429px] md:h-auto items-start justify-start p-4 w-[360px]"
            style={{ overflow: "scroll", overflowX: "hidden" }}
          >
            <div className="flex flex-col gap-2 items-center justify-start w-auto h-[429px]">
              {/* <Text
                className="text-[11px] text-gray-600 w-auto"
                size="txtDMSansMedium11"
              >
                Wed 8:21 AM
              </Text> */}
              {messages.map((message, index) => (
                <div key={index}>
                  {message.sender === "bot" && (
                    <div className="flex flex-row gap-2 items-start justify-start w-[327px]">
                      <Button
                        className="flex h-8 items-center justify-center rounded-[50%] w-8"
                        shape="circle"
                        color="gray_50_01"
                        size="sm"
                        variant="fill"
                      >
                        <Img
                          className="h-4"
                          src={
                            dataContext.profileUrl
                              ? dataContext.profileUrl
                              : "/images/img_bot_44x44.png"
                          }
                          alt="bot_One"
                        />
                      </Button>

                      <div className="flex flex-col gap-2 items-start justify-start w-full">
                        <div className="bg-gray-100_03 p-3 relative rounded-bl-[12px] rounded-br-[12px] rounded-tr-[12px] w-full">
                          <Text
                            className="leading-[150.00%] m-auto max-w-[263px] md:max-w-full text-blue_gray-900_01 text-xs"
                            size="txtDMSansRegular12"
                          >
                            {message.text}
                          </Text>
                          {/* <Img
                      className="absolute bottom-[13%] h-2 right-[3%] w-5"
                      src="/images/img_frame1000003117.svg"
                      alt="frame1000003117"
                    /> */}
                        </div>

                        {/* <div className="bg-gray-100_03 p-3 relative rounded-[12px] w-full">
                    <Text
                      className="leading-[150.00%] m-auto max-w-[263px] md:max-w-full text-blue_gray-900_01 text-xs"
                      size="txtDMSansRegular12"
                    >
                      {" "}
                      incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis{" "}
                    </Text>
                    <Img
                      className="absolute bottom-[13%] h-2 right-[3%] w-5"
                      src="/images/img_frame1000003117.svg"
                      alt="frame1000003117_One"
                    />
                  </div> */}
                        {/* <Input
                    name="language_One"
                    placeholder="nim ad minim veniam, quis "
                    className="p-0 placeholder:text-blue_gray-900_01 text-left text-xs w-full"
                    wrapClassName="flex w-full"
                    suffix={
                      <Img
                        className="mt-3 mb-auto ml-[35px]"
                        src="/images/img_frame1000003117.svg"
                        alt="Frame 1000003117"
                      />
                    }
                    shape="round"
                  ></Input> */}
                      </div>
                    </div>
                  )}

                  {message.sender === "user" && (
                    <div className="flex flex-row gap-2 items-start justify-start w-[327px]">
                      <Button
                        className="flex h-8 items-center justify-center rounded-[50%] w-8"
                        shape="circle"
                        // color="gray_50_01"
                        // color="#7C3AED"
                        size="sm"
                        // variant="fill"
                      >
                        {/* <Img
                          className="h-4"
                          src={
                            dataContext.profileUrl
                              ? dataContext.profileUrl
                              : "/images/img_bot_44x44.png"
                          }
                          alt="bot_One"
                        /> */}
                      </Button>
                      <div className="flex flex-col gap-2 items-start justify-start w-full">
                        <div
                          className=" p-3 relative rounded-bl-[12px] rounded-tl-[12px] rounded-tr-[12px] w-full"
                          style={{ backgroundColor: "#e5d8fb" }}
                        >
                          <Text
                            className="leading-[150.00%] m-auto max-w-[263px] md:max-w-full text-blue_gray-900_01 text-xs"
                            size="txtDMSansRegular12"
                          >
                            {message.text}
                          </Text>
                          {/* <Img
                                className="absolute bottom-[13%] h-2 right-[3%] w-5"
                                src="/images/img_frame1000003117.svg"
                                alt="frame1000003117"
                              /> */}
                        </div>

                        {/* <div className="bg-gray-100_03 p-3 relative rounded-[12px] w-full">
                            <Text
                              className="leading-[150.00%] m-auto max-w-[263px] md:max-w-full text-blue_gray-900_01 text-xs"
                              size="txtDMSansRegular12"
                            >
                              {" "}
                              incididunt ut labore et dolore magna aliqua. Ut enim ad
                              minim veniam, quis{" "}
                            </Text>
                            <Img
                              className="absolute bottom-[13%] h-2 right-[3%] w-5"
                              src="/images/img_frame1000003117.svg"
                              alt="frame1000003117_One"
                            />
                          </div> */}
                        {/* <Input
                            name="language_One"
                            placeholder="nim ad minim veniam, quis "
                            className="p-0 placeholder:text-blue_gray-900_01 text-left text-xs w-full"
                            wrapClassName="flex w-full"
                            suffix={
                              <Img
                                className="mt-3 mb-auto ml-[35px]"
                                src="/images/img_frame1000003117.svg"
                                alt="Frame 1000003117"
                              />
                            }
                            shape="round"
                          ></Input> */}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {msgGen && (
                <div>
                  <div className="flex flex-row gap-2 items-start justify-start w-[327px]">
                    <Button
                      className="flex h-8 items-center justify-center rounded-[50%] w-8"
                      size="sm"
                    ></Button>

                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                      <div className="bg-gray-100_03 p-3 relative rounded-bl-[12px] rounded-br-[12px] rounded-tr-[12px] w-full">
                        <Text
                          className="leading-[150.00%] m-auto max-w-[263px] md:max-w-full text-blue_gray-900_01 text-xs"
                          size="txtDMSansRegular12"
                        >
                          <div>
                            <div>
                              <Dot
                                style={{
                                  fontWeight: "700",
                                  fontSize: "40px",
                                }}
                              >
                                .
                              </Dot>
                              <Dot
                                style={{
                                  fontWeight: "700",
                                  fontSize: "40px",
                                }}
                              >
                                .
                              </Dot>
                              <Dot
                                style={{
                                  fontWeight: "700",
                                  fontSize: "40px",
                                }}
                              >
                                .
                              </Dot>
                            </div>
                          </div>
                        </Text>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                </div>
              )}
            </div>
          </div>

          <div
            className="flex flex-row gap-2 items-start justify-start w-full py-[10px]"
            style={{ paddingLeft: "5px" }}
          >
            {dataContext.commonQuestions.slice(0, 1).map(
              (
                message,
                index // Take the top 5 messages
              ) => (
                <Button
                  key={index}
                  className="bg-gray-100_03 flex flex-col items-end justify-end p-2 rounded-lg w-auto"
                  onClick={() => {
                    console.log(message);
                    setInput(message);
                  }}
                >
                  <Text
                    className="text-[10px] text-blue_gray-900_01 w-auto"
                    size="txtDMSansRegular10"
                  >
                    <div>
                      {message.length > 15
                        ? `${message.substring(0, 30)}...`
                        : message}
                    </div>
                  </Text>
                </Button>
              )
            )}
            {/* <div className="bg-gray-100_03 flex flex-col items-end justify-end p-2 rounded-lg w-auto">
              <Text
                className="text-[10px] text-blue_gray-900_01 w-auto"
                size="txtDMSansRegular10"
              >
                When will i receive my refund?
              </Text>
            </div> */}
          </div>
          <Line className="bg-black-900_0c h-px w-full" />
          <div className="bg-white-A700 flex flex-col font-lato items-start justify-between p-4 rounded-bl-[12px] rounded-br-[12px] w-[360px]">
            <div className="flex flex-row gap-3 items-center justify-start w-full">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                    setInput(""); // Clear the input
                  }
                }}
                name="input"
                placeholder="Type a message..."
                className="p-0 placeholder:text-gray-600 text-[11.43px] text-left w-full"
                wrapClassName="border border-gray-500_02 border-solid flex-1 rounded-[20px] w-[90%]"
                color="white_A700"
              ></input>

              <Button
                onClick={() => {
                  handleSubmit();
                  setMsgGen(true);
                  console.log("send button clicked");
                }}
              >
                <Img
                  className="h-6 w-6"
                  src="/images/img_frame_gray_900_02.svg"
                  alt="frame"
                />
              </Button>
            </div>
          </div>
        </div>
        {/* <Button
          className="common-pointer flex h-12 items-center justify-center w-12"
          onClick={() => navigate("/landingpage")}
          shape="circle"
          size="lg"
          color="purple_800_indigo_800"
        >
          <Img
            className="h-5"
            src="/images/img_component15.svg"
            alt="componentFifteen"
          />
        </Button> */}
        {/* </div> */}
      </>
    </>
  );
};

export default Messenger;
