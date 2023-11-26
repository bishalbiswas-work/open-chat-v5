import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
const LandingpageOne = React.lazy(() => import("pages/LandingpageOne"));
const ChatInterfacev3 = React.lazy(() => import("pages/ChatInterfacev3"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/chatInterfacev3" element={<ChatInterfacev3 />} />
          <Route path="/landingpageone" element={<LandingpageOne />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
