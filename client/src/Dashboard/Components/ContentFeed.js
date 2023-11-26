import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
// ContextAPI
import { useContext } from "react";
import DataContext from "../../ContextAPI/DataState";
// ContextAPI End
// Icons
import CircularProgress from "@mui/material/CircularProgress";
// End Icons
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const ContextFeed = () => {
  // Base Url
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  //
  // const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const [aboutBusiness, setAboutBusiness] = useState(dataContext.aboutBusiness);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [allQuestions, setAllQuestions] = useState(dataContext.questions);
  const [allAnswers, setAllAnswers] = useState(dataContext.answers);
  const [submitQuestionAnswer, setSubmitQuestionAnswer] = useState(false);
  const [submitAllData, setSubmitAllData] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedValues, setSelectedValues] = useState({
    email: dataContext.collectEmail,
    phone: dataContext.collectPhoneNo,
    name: dataContext.collectName,
  });
  const [selectedInput2004, setSelectedInput2004] = useState(true);

  const handleChange = (event) => {
    setSelectedValues({
      ...selectedValues,
      [event.target.name]: event.target.checked,
    });
  };
  const handleAboutBusinessChange = (value) => {
    setAboutBusiness(value);
  };
  const handleQuestionChange = (value) => {
    setQuestion(value);
  };
  const handleAnswerChange = (value) => {
    setAnswer(value);
  };
  const handleSubmitQuestoinAndAnswer = () => {
    // let dataContext.questions.push(question);
    // dataContext.answers.push(answer);
    setAllQuestions((allQuestions) => [...allQuestions, question]);
    setAllAnswers((allAnswers) => [...allAnswers, answer]);

    setQuestion("");
    setAnswer("");
  };
  const handleSubmitAllData = async () => {
    // await dataContext.updateKnowledgeBase();
    setLoader(true);
    const submitData = {
      questions: dataContext.questions,
      answers: dataContext.answers,
      aboutBusiness: dataContext.aboutBusiness,
      collectEmail: dataContext.collectEmail,
      collectPhoneNo: dataContext.collectPhoneNo,
      collectName: dataContext.collectName,
    };
    const reply = await updateKnowledgeBase(submitData, dataContext.authToken);
    console.log(reply);
    setSubmitAllData(false);
    setLoader(false);
  };

  const updateKnowledgeBase = async (submitData, bearerToken) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/update-knowledge`,
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
  useEffect(() => {
    // Update the document title using the browser API
    dataContext.setAboutBusinessFunction({ data: aboutBusiness });
    // dataContext.setAnswersFunction({ data: answers });
  }, [aboutBusiness]);
  useEffect(() => {
    // Update the document title using the browser API
    dataContext.setCollectEmailFunction({ data: selectedValues.email });
    dataContext.setCollectPhoneNoFunction({ data: selectedValues.phone });
    dataContext.setCollectNameFunction({ data: selectedValues.name });
    // dataContext.setAnswersFunction({ data: answers });
    console.log("data changed");
  }, [selectedValues]);

  useEffect(() => {
    dataContext.setQuestionsFunction({ data: allQuestions });
    dataContext.setAnswersFunction({ data: allAnswers });
    console.log(allQuestions);
    setSubmitQuestionAnswer(false);
  }, [submitQuestionAnswer]);
  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: "2rem", padding: "0 1rem" }}>
        <Grid
          container
          spacing={2}
          direction="column"
          style={{ justifyContent: "start" }}
        >
          <Grid item xs={12}>
            <Box style={{ display: "flex" }}>
              <Button
                variant="text"
                style={{
                  mx: 2,
                  fontSize: "20px",
                  fontWeight: 500,
                  color: selectedInput2004 ? "#000" : "#717171",
                }}
                onClick={() => {
                  // setSelectedInput2004(false);
                  setSelectedInput2004(true);
                }}
              >
                {" "}
                Q&A
              </Button>
              <Button
                variant="text"
                style={{
                  mx: 2,
                  fontSize: "20px",
                  fontWeight: 500,
                  color: !selectedInput2004 ? "#000" : "#717171",
                  textTransform: "none",
                }}
                onClick={() => {
                  // setSelectedInput2004(true);
                  setSelectedInput2004(false);
                }}
              >
                Text
              </Button>
              <Box width="20px"></Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {!selectedInput2004 && (
              <Box>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      mt: 4,
                      fontSize: "18px",
                      fontFamily: "DM Sans",
                      color: "#170F49",
                      fontWeight: "500",
                      marginLeft: "1rem",
                    }}
                  >
                    {`Add Data About ${
                      (dataContext.name?.charAt(0)?.toUpperCase() ?? "") +
                      (dataContext.name?.slice(1) ?? "")
                    }`}
                  </Typography>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    marginTop: "20px",
                    padding: "10px",
                  }}
                >
                  {/* <TextField
                    placeholder="Paste your company information"
                    variant="outlined"
                    type="text"
                    fullWidth
                    multiline
                    value={aboutBusiness}
                    rows={6}
                    // value={item.ans}
                    style={{
                      fontFamily: "Inter, sans-serif !important",
                    }}
                    sx={{
                      fontSize: "12px", // reduced font size
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent", // make the border transparent
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent", // make the hover border transparent
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent", // make the focus border transparent
                        },
                      },
                      "& .MuiInputBase-root": {
                        // height: "40px", // reduce the height, but ensure it's enough for the text and padding
                      },
                    }}
                    onChange={(e) =>
                      handleAboutBusinessChange(index, e.target.value)
                    }
                  /> */}
                  <TextField
                    placeholder="Paste your company information"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={aboutBusiness}
                    inputProps={{
                      style: { fontFamily: "DM Sans", borderRadius: "8px" },
                    }}
                    sx={{
                      fontSize: "18px", // reduced font size
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#7B68EE",
                        },
                      },
                    }}
                    onChange={(e) => handleAboutBusinessChange(e.target.value)}
                  />
                  {/* <textarea
                    placeholder="Paste your company information"
                    value={aboutBusiness}
                    rows="6"
                    style={{
                      width: "100%", // For full width
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      border: "none", // Removes default border
                      outline: "none", // Removes focus border
                      resize: "none", // Prevents user resizing
                      // Add other desired styles
                    }}
                    onChange={(e) => handleAboutBusinessChange(e.target.value)}
                  /> */}
                  {/* <Box
                    height="100%"
                    style={{
                      display: "",
                      justifyContent: "cemter",
                    }}
                  >
                    <Box height="180px" backgroundColor=""></Box>
                    <Button
                      // variant="outlined"
                      size="small"
                      // onClick={handleSubmit}
                      sx={{
                        fontFamily: "Inter, sans-serif !important",
                      }}
                      style={{
                        display: "flex", // Added to help with alignment
                        alignItems: "center", // Center items vertically
                        justifyContent: "center", // Center items horizontally
                        color: "blue",
                        //   color: "white",
                        //   borderRadius: "10px",
                        //   background: "#0084FF",
                        fontSize: "12px",
                        fontWeight: "700",
                        textTransform: "none",
                      }}
                    >
                      Submit
                    </Button>
                  </Box> */}
                </Box>
              </Box>
            )}
            {selectedInput2004 && (
              <Box style={{ padding: "0rem 4rem 0rem 0rem" }}>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      mt: 4,
                      fontSize: "18px",
                      fontFamily: "DM Sans",
                      color: "#170F49",
                      fontWeight: "500",
                      marginLeft: "1rem",
                    }}
                  >
                    Add New Question
                  </Typography>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    marginTop: "20px",
                    padding: "10px",
                  }}
                >
                  <TextField
                    placeholder="Question?"
                    variant="outlined"
                    type="text"
                    fullWidth
                    value={question}
                    inputProps={{
                      style: { fontFamily: "DM Sans", borderRadius: "8px" },
                    }}
                    sx={{
                      fontWeight: 400,
                      fontSize: "18px", // reduced font size
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#7B68EE",
                        },
                      },
                    }}
                    onChange={(e) => handleQuestionChange(e.target.value)}
                  />
                  {/* <textarea
                    placeholder="Aa"
                    value={question}
                    // rows="4"
                    style={{
                      padding: "5px 10px",
                      width: "100%", // For full width
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      border: "none", // Removes default border
                      outline: "none", // Removes focus border
                      resize: "none", // Prevents user resizing
                      // Add other desired styles
                    }}
                    onChange={(e) => handleQuestionChange(e.target.value)}
                  /> */}
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    marginTop: "20px",
                    padding: "10px",
                    position: "relative",
                  }}
                >
                  {/* <TextField
                    placeholder="Paste your company information"
                    variant="outlined"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    // value={item.ans}
                    style={{
                      fontFamily: "Inter, sans-serif !important",
                    }}
                    sx={{
                      fontSize: "12px", // reduced font size
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent", // make the border transparent
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent", // make the hover border transparent
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent", // make the focus border transparent
                        },
                      },
                      "& .MuiInputBase-root": {
                        //   height: "40px", // reduce the height, but ensure it's enough for the text and padding
                      },
                    }}
                    // onChange={(e) => handleAnswerChange(index, e.target.value)}
                  /> */}
                  <TextField
                    placeholder="Answer"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={answer}
                    inputProps={{
                      style: { fontFamily: "DM Sans", borderRadius: "8px" },
                    }}
                    sx={{
                      fontSize: "18px", // reduced font size
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#7B68EE",
                        },
                      },
                    }}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                  />
                  {/* <textarea
                    placeholder="Paste your company information"
                    value={answer}
                    rows="4"
                    style={{
                      width: "100%", // For full width
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      border: "none", // Removes default border
                      outline: "none", // Removes focus border
                      resize: "none", // Prevents user resizing
                      // Add other desired styles
                    }}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                  /> */}
                  <Button
                    // variant="outlined"
                    size="small"
                    onClick={() => {
                      handleSubmitQuestoinAndAnswer();
                      setSubmitQuestionAnswer(true);
                    }}
                    sx={{
                      fontFamily: "Inter, sans-serif !important",
                    }}
                    style={{
                      display: "flex", // Added to help with alignment
                      alignItems: "center", // Center items vertically
                      justifyContent: "center", // Center items horizontally
                      color: "blue",
                      //   color: "white",
                      //   borderRadius: "10px",
                      //   background: "#0084FF",
                      fontSize: "13px",
                      fontWeight: "700",
                      textTransform: "none",
                      position: "absolute",
                      right: "32px",
                      bottom: "22px",
                      background:
                        "linear-gradient(225deg, #693283 0%, #323283 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            {/* <Box
              //   height="100%"
              style={{
                display: "flex",
                // justifyContent: "cemter",
              }}
            >
              <FormControl sx={{ justifyContent: "start" }}>
                <FormLabel id="demo-checkbox-group-label">
                  <Typography
                    sx={{
                      mt: 4,
                      fontSize: "18px",
                      fontFamily: "DM Sans",
                      color: "#170F49",
                      fontWeight: 500,
                    }}
                  >
                    Contact info to collect in case AI can't answer question:
                  </Typography>
                </FormLabel>
                <FormGroup
                  aria-labelledby="demo-checkbox-group-label"
                  row // This prop makes the group display in a row
                  //   textAlign="left"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedValues.email}
                        onChange={handleChange}
                        name="email"
                        sx={{
                          borderRadius: "0",
                          "&.Mui-checked": {
                            color: "#693283",
                          },
                        }}
                      />
                    }
                    label="Email"
                    style={{ color: "#2F007B" }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedValues.phone}
                        onChange={handleChange}
                        name="phone"
                        inputProps={{ style: { borderRadius: "50px" } }}
                        sx={{
                          borderRadius: "0",
                          "&.Mui-checked": {
                            color: "#693283",
                          },
                        }}
                      />
                    }
                    label="Mobile No. "
                    style={{ color: "#2F007B" }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedValues.name}
                        onChange={handleChange}
                        name="name"
                        sx={{
                          borderRadius: "0",
                          "&.Mui-checked": {
                            color: "#693283",
                          },
                        }}
                      />
                    }
                    label="Name"
                    style={{ color: "#2F007B" }}
                  />
                </FormGroup>
              </FormControl>
            </Box> */}
            <Box sx={{ my: 4 }}>
              <Box className="chat-btn-box">
                {loader ? (
                  <CircularProgress />
                ) : (
                  <button
                    className="chat-btn"
                    variant="contained"
                    onClick={() => {
                      handleSubmitAllData();
                      setSubmitAllData(true);
                    }}
                    // style={{
                    //   fontSize: "18px",
                    //   paddingLeft: "60px",
                    //   paddingRight: "60px",
                    //   fontWeight: "bold",

                    //   background:
                    //     "linear-gradient(180deg, rgb(105.08, 50, 131) 0%, rgb(50.16, 50.16, 130.74) 100%)",
                    //   padding: "5px 80px", // Adjust padding as needed
                    //   borderRadius: "8px", // Adjust border radius as needed
                    // }}
                  >
                    Submit
                  </button>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default ContextFeed;
