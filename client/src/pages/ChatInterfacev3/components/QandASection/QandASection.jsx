import react from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// import { Button, Img, Line, List, Text } from "components";
import { Button, Img, Line, List, Text } from "../../../../components";
import axios from "axios";

// Icons
import CircularProgress from "@mui/material/CircularProgress";
// End Icons

import { useContext } from "react";
import DataContext from "ContextAPI/DataState";

const QandASection = ({ content: initialContent }) => {
  // Base Url
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  //
  const dataContext = useContext(DataContext);
  const [query, setQuery] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
  );
  const [ModifyQueryPopup, setModifyQueryPopup] = useState(false);
  const [InputQueryPopup, setInputQueryPopup] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [DeleteQueryPopup, setDeleteQueryPopup] = useState(false);
  // Function to toggle overlay
  const toggleOverlay = () => {
    setIsOverlayActive(!isOverlayActive);
  };
  const handleQueryChange = () => {
    toggleOverlay();
  };
  const handleNewQuery = () => {
    toggleOverlay();
  };
  const handleEditQueryClick = (index) => {
    toggleOverlay();
    setModifyQueryPopup(!ModifyQueryPopup);
    setQuestion(allQuestions[index]);
    setAnswer(allAnswers[index]);
  };
  const handleNewQueryClick = () => {
    toggleOverlay();
    setInputQueryPopup(!InputQueryPopup);
  };
  const handleNewQueryUpdate = () => {
    handleSubmitQuestionAndAnswer();
    setSubmitQuestionAnswer(true);
    handleSubmitAllData(); // Second time calling to make sure data updated
    setSubmitAllData(true);
  };
  const handleEditQueryUpdate = () => {
    updateQuestionAndAnswer();
    setSubmitQuestionAnswer(true);
    handleSubmitAllData(); // Second time calling to make sure data updated
    setSubmitAllData(true);
  };
  const handleDeleteQueryClick = () => {
    toggleOverlay();
    setDeleteQueryPopup(!DeleteQueryPopup);
  };
  const exitOverlay = () => {
    setIsOverlayActive(false);
    setModifyQueryPopup(false);
    setInputQueryPopup(false);
    setDeleteQueryPopup(false);
  };
  // useEffect(() => {
  //   console.log(InputQueryPopup);
  // }, [InputQueryPopup]);
  // Data Processing ====================================
  const forms = new Array(5).fill(null);
  const [questions, setQuestions] = useState(dataContext.questions);
  const [answers, setAnswers] = useState(dataContext.answers);

  const [content, setContent] = useState(initialContent);

  // const handleQuestionChange = (index, value) => {
  //   // Create a new array with the updated question
  //   const newContent = [...questions];
  //   newContent[index] = value;
  //   setQuestions(newContent);
  //   console.log(newContent);
  // };

  // const handleAnswerChange = (index, value) => {
  //   // Create a new array with the updated answer
  //   const newContent = [...answers];
  //   newContent[index] = value;
  //   setAnswers(newContent);
  //   console.log(newContent);
  // };
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   dataContext.setQuestionsFunction({ data: questions });
  //   dataContext.setAnswersFunction({ data: answers });
  // }, [questions, answers]);
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   setQuestions(dataContext.questions);
  //   setAnswers(dataContext.answers);
  // }, [dataContext.questions, dataContext.answers]);
  // ====================================================

  // ====================================================
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editSelectedIndex, setEditSelectedIndex] = useState();
  const [allQuestions, setAllQuestions] = useState(dataContext.questions);
  const [allAnswers, setAllAnswers] = useState(dataContext.answers);
  const [submitQuestionAnswer, setSubmitQuestionAnswer] = useState(false);
  const [submitAllData, setSubmitAllData] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleNewQuestionChange = (value) => setQuestion(value);
  const handleNewAnswerChange = (value) => setAnswer(value);

  const updateQuestionAndAnswer = async () => {
    exitOverlay();
    setAllQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[editSelectedIndex] = question;
      return updatedQuestions;
    });

    setAllAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[editSelectedIndex] = answer;
      return updatedAnswers;
    });

    // Call the function to update the backend
    await handleSubmitAllData();
  };
  const handleSubmitQuestionAndAnswer = () => {
    exitOverlay(); // Close popup after submission
    setAllQuestions((prevQuestions) => [...prevQuestions, question]);
    setAllAnswers((prevAnswers) => [...prevAnswers, answer]);
    handleSubmitAllData(); // Submit all data after updating questions and answers
    setQuestion("");
    setAnswer("");
  };

  const handleSubmitAllData = async () => {
    setLoader(true);
    const submitData = {
      questions: allQuestions,
      answers: allAnswers,
      aboutBusiness: dataContext.aboutBusiness,
      collectEmail: dataContext.collectEmail,
      collectPhoneNo: dataContext.collectPhoneNo,
      collectName: dataContext.collectName,
    };
    await updateKnowledgeBase(submitData, dataContext.authToken);
    setLoader(false);
  };

  const updateKnowledgeBase = async (submitData, bearerToken) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/update-knowledge`,
        submitData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Update the dataContext only if there are changes
    dataContext.setQuestionsFunction({ data: allQuestions });
    dataContext.setAnswersFunction({ data: allAnswers });
  }, [allQuestions, allAnswers, dataContext]);

  // Data End Processing ================================

  return (
    <>
      <>
        <div className="flex md:flex-col flex-row gap-6 h-[430px] md:h-auto items-start justify-start w-auto md:w-full">
          <div
            className="bg-white-A700 flex flex-col gap-4 h-[430px] md:h-auto items-start justify-start max-w-[692px] rounded-[12px] w-full"
            style={{ overflowY: "scroll" }}
          >
            {/*  */}
            <div>
              <List
                className="flex flex-col gap-4 items-center w-full"
                orientation="vertical"
                style={{ paddingRight: "10px" }}
              >
                <div>
                  {allQuestions.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-1 md:flex-col flex-row gap-4 items-start justify-start w-full"
                    >
                      <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-1 flex-col gap-4 items-left justify-center p-4 rounded-[10px] w-full">
                        <Text
                          className="text-[15px] text-black-900 w-full"
                          size="txtLatoSemiBold15"
                        >
                          {allQuestions[index]}
                        </Text>
                        <Line className="bg-black-900_0c h-px w-full" />
                        <Text
                          className="leading-[170.00%] max-w-[556px] md:max-w-full text-blue_gray-700_bf text-sm"
                          size="txtLatoRegular14Bluegray700bf"
                        >
                          {allAnswers[index]}
                        </Text>
                      </div>
                      {/* <Img
                          className="h-10 max-h-10 sm:w-[] md:w-[]"
                          src="/images/img_frame1000003104.svg"
                          alt="frame1000003104"
                        /> */}
                      <div style={{ display: "flex", gap: 1 }}>
                        <Button
                          onClick={() => {
                            setEditSelectedIndex(index);
                            handleEditQueryClick(index);
                          }}
                        >
                          <Img src="/images/pen_button.png" />
                        </Button>
                        <Button
                          onClick={() => {
                            handleDeleteQueryClick();
                          }}
                        >
                          <Img src="/images/delete_button.png" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {allQuestions.length === 0 && (
                  <div className="flex flex-1 md:flex-col flex-row gap-4 items-start justify-start w-[600px] md:w-full">
                    <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-1 flex-col gap-4 items-center justify-center p-4 rounded-[10px] w-full">
                      <Text
                        className="text-[15px] text-black-900 w-full"
                        size="txtLatoSemiBold15"
                      >
                        No question to show now! Please re-try to get quesiton
                        show now!
                      </Text>
                      <Line className="bg-black-900_0c h-px w-full" />
                      <Text
                        className="leading-[170.00%] max-w-[556px] md:max-w-full text-blue_gray-700_bf text-sm"
                        size="txtLatoRegular14Bluegray700bf"
                      >
                        Sorry!
                      </Text>
                    </div>
                  </div>
                )}
                {/* <div className="flex flex-1 md:flex-col flex-row gap-4 items-start justify-start w-full">
                  <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-1 flex-col gap-4 items-center justify-center p-4 rounded-[10px] w-full">
                    <Text
                      className="text-[15px] text-black-900 w-full"
                      size="txtLatoSemiBold15"
                    >
                      What is your favorite template?{" "}
                    </Text>
                    <Line className="bg-black-900_0c h-px w-full" />
                    <Text
                      className="leading-[150.00%] max-w-[556px] md:max-w-full text-blue_gray-700_bf text-sm"
                      size="txtLatoRegular14Bluegray700bf"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis{" "}
                    </Text>
                  </div>
                  <Img
                    className="h-10 max-h-10 sm:w-[] md:w-[]"
                    src="/images/img_frame1000003104.svg"
                    alt="frame1000003104"
                  />
                </div> */}
                {/* <div className="flex flex-1 md:flex-col flex-row gap-4 items-start justify-start w-full">
                  <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-1 flex-col gap-4 items-center justify-center p-4 rounded-[10px] w-full">
                    <Text
                      className="text-[15px] text-black-900 w-full"
                      size="txtLatoSemiBold15"
                    >
                      What is your favorite template from BRIX Templates?{" "}
                    </Text>
                    <Line className="bg-black-900_0c h-px w-full" />
                    <Text
                      className="leading-[150.00%] max-w-[556px] md:max-w-full text-blue_gray-700_bf text-sm"
                      size="txtLatoRegular14Bluegray700bf"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis{" "}
                    </Text>
                  </div>
                  <Img
                    className="h-10 max-h-10 sm:w-[] md:w-[]"
                    src="/images/img_frame1000003104.svg"
                    alt="frame1000003104"
                  />
                </div> */}
              </List>
            </div>
            <div>
              {isOverlayActive && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10">
                  {/* Overlay content goes here */}
                  {ModifyQueryPopup && (
                    <div>
                      <div
                        className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto my-8"
                        style={{
                          backgroundColor: "white",
                          borderRadius: "10px",
                        }}
                      >
                        <h2 className="text-xl font-semibold mb-4">
                          Edit Existing Query
                        </h2>

                        <div className="mb-4">
                          <input
                            value={question}
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 
                              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="What is your favorite template from BRIX Templates?"
                            onChange={(e) =>
                              handleNewQuestionChange(e.target.value)
                            }
                          />
                        </div>

                        <div className="mb-4">
                          <textarea
                            value={answer}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 
                               focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            rows="4"
                            placeholder="Enter your answer here"
                            onChange={(e) =>
                              handleNewAnswerChange(e.target.value)
                            }
                          ></textarea>
                        </div>

                        <div className="flex justify-start mt-6">
                          <button
                            type="button"
                            className="mr-2 px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm 
                               hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            style={{ borderRadius: "20px" }}
                            onClick={() => {
                              exitOverlay();
                            }}
                          >
                            Discard Changes
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-sm font-medium text-white rounded-md shadow-sm 
                               hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            style={{ borderRadius: "20px" }}
                            onClick={() => {
                              handleEditQueryUpdate();
                            }}
                          >
                            Save Query
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {InputQueryPopup && (
                    <div>
                      <div
                        className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto my-8"
                        style={{
                          backgroundColor: "white",
                          borderRadius: "10px",
                        }}
                      >
                        <h2 className="text-xl font-semibold mb-4">
                          Add a New Query
                        </h2>

                        <div className="mb-4">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 
                               focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="What is your favorite template from BRIX Templates?"
                            onChange={(e) =>
                              handleNewQuestionChange(e.target.value)
                            }
                          />
                        </div>

                        <div className="mb-4">
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 
                               focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            rows="4"
                            placeholder="Enter your answer here"
                            onChange={(e) =>
                              handleNewAnswerChange(e.target.value)
                            }
                          ></textarea>
                        </div>

                        <div className="flex justify-start mt-6">
                          <button
                            type="button"
                            className="mr-2 px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm 
                               hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            style={{ borderRadius: "20px" }}
                            onClick={() => {
                              exitOverlay();
                            }}
                          >
                            Discard Changes
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-sm font-medium text-white rounded-md shadow-sm 
                               hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            style={{ borderRadius: "20px" }}
                            onClick={() => {
                              handleNewQueryUpdate();
                            }}
                          >
                            Add Query
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {DeleteQueryPopup && (
                    <div>
                      <div
                        className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto my-8"
                        style={{
                          backgroundColor: "white",
                          borderRadius: "10px",
                        }}
                      >
                        <h2 className="text-xl font-semibold mb-4">
                          Do you want to delete this question?
                        </h2>

                        {/* <div className="mb-4">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 
                            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="What is your favorite template from BRIX Templates?"
                          />
                        </div>

                        <div className="mb-4">
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 
                            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            rows="4"
                            placeholder="Enter your answer here"
                          ></textarea>
                        </div> */}
                        <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-1 flex-col gap-4 items-center justify-center p-4 rounded-[10px] w-full">
                          <Text
                            className="text-[15px] text-black-900 w-full"
                            size="txtLatoSemiBold15"
                          >
                            What is your favorite template from BRIX Templates?{" "}
                          </Text>
                          <Line className="bg-black-900_0c h-px w-full" />
                          <Text
                            className="leading-[170.00%] max-w-[556px] md:max-w-full text-blue_gray-700_bf text-sm"
                            size="txtLatoRegular14Bluegray700bf"
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis{" "}
                          </Text>
                        </div>

                        <div className="flex justify-start mt-6">
                          <button
                            type="button"
                            className="mr-2 px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm 
                            hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            style={{ borderRadius: "20px" }}
                            onClick={() => {
                              exitOverlay();
                            }}
                          >
                            Discard
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-sm font-medium text-white rounded-md shadow-sm 
                            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            style={{ borderRadius: "20px" }}
                          >
                            Yes! Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Img
              className="h-1 rounded-bl-[12px] rounded-br-[12px] w-full"
              src="/images/img_frame1000003106.svg"
              alt="frame1000003106"
            />
          </div>
          {/* <div className="relative w-[1%] md:w-full">
            <Line className="bg-gray-100 h-[430px] m-auto rounded-sm w-1" />
            <Line className="absolute bg-deep_purple-A200_01 h-[100px] inset-[0] justify-center m-auto rounded-sm w-1" />
          </div> */}
        </div>

        <div
          className="flex flex-col font-poppins items-start justify-start w-auto"
          style={{ paddingTop: "50px" }}
        >
          {questions.length !== 0 && (
            <Button
              className="cursor-pointer flex items-center justify-center min-w-[167px]"
              leftIcon={
                <Img
                  className="h-3.5 mt-px mb-0.5 mr-1"
                  src="/images/img_frame_14x14.png"
                  alt="Frame"
                />
              }
              shape="round"
              color="deep_purple_A200_33_deep_purple_700_33"
              onClick={() => {
                // handleNewQuery();
                handleNewQueryClick();
              }}
            >
              <div className="!text-deep_purple-A200 font-medium text-left text-xs">
                Add new question
              </div>
            </Button>
          )}
          {loader && (
            <>
              <CircularProgress />
            </>
          )}
        </div>
      </>
    </>
  );
};
export default QandASection;
