// import React from "react";
// import Routes from "./Routes";

// function App() {
//   return <Routes />;
// }

// export default App;
import React, { Component } from "react";
import logo from "./logo.svg";
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages Import
import LandingPage from "./Pages/LandingPage";
// import { Prebuild_LandingPage } from "./Pages/Components/Prebuild_LandingPage/Prebuild_LandingPage";
import ExtractData from "./Pages/Onboard/ExtractData";
import ExtractDatav2 from "./Pages/Onboard/ExtractDatav2";
import Signup from "./Pages/Auth/Signup";
import ChatInterface from "./Dashboard/ChatInterface";
import ChatInterface_v2 from "./Dashboard/ChatInterface_v2";
// import Logout from "./Pages/Auth/Logout";
// import PaymentSuccess from "./Pages/Auth/PaymentSuccess";
// End Pages Imports
// Components Import
import WrapperComponent from "./Pages/WrapperComponent";
// import SelectPage from "./Pages/Onboard/SelectPage";
// End Components Imports

// ContextAPI
import DataState from "./ContextAPI/DataContext";
import ChatInterfacev3 from "pages/ChatInterfacev3";
// import ExtractData from "./Pages/Onboard/ExtractData";
// import ChatInterface from "./Pages/Onboard/ChatInterface";
// import Success from "./Pages/Auth/Success";
// ContentAPI End
class App extends Component {
  render() {
    return (
      <>
        <DataState>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route
                  index
                  element={
                    <WrapperComponent>
                      <LandingPage />
                      {/* <Prebuild_LandingPage /> */}
                    </WrapperComponent>
                  }
                />
                {/* <Route
                  path="/home"
                  element={
                    <WrapperComponent>
                      {" "}
                      <LandingPage />{" "}
                    </WrapperComponent>
                  }
                /> */}
                <Route
                  path="/auth"
                  element={
                    <WrapperComponent>
                      <Signup />
                    </WrapperComponent>
                  }
                />
                {/* <Route
                  path="/logout"
                  element={
                    <WrapperComponent>
                      <Logout />
                    </WrapperComponent>
                  }
                /> */}
                {/* <Route
                  path="/success"
                  element={
                    <WrapperComponent>
                      <PaymentSuccess />
                    </WrapperComponent>
                  }
                /> */}
                {/* <Route
                  path="/select-page"
                  element={
                    <WrapperComponent>
                      <SelectPage />
                    </WrapperComponent>
                  }
                /> */}
                <Route
                  path="/extract-data"
                  element={
                    <WrapperComponent>
                      {/* <ExtractData /> */}
                      <ExtractDatav2 />
                    </WrapperComponent>
                  }
                />
                {/* <Route
                  path="dashboard/chat"
                  element={
                    <WrapperComponent>
                      <ChatInterface />
                    </WrapperComponent>
                  }
                /> */}
                {/* <Route
                  path="dashboard/chat"
                  element={
                    <WrapperComponent>
                      <ChatInterface_v2 />
                    </WrapperComponent>
                  }
                /> */}
                <Route
                  path="dashboard/chat"
                  element={
                    <WrapperComponent>
                      <ChatInterfacev3 />
                    </WrapperComponent>
                  }
                />
                {/* <Route
                  path="/success"
                  element={
                    <WrapperComponent>
                      <Success />
                    </WrapperComponent>
                  }
                /> */}
              </Route>
            </Routes>
          </BrowserRouter>
        </DataState>
      </>
    );
  }
}

export default App;
