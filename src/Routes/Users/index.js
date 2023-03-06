import { ProtectedRoute } from "components";
import React from "react";
import { Route, Routes } from "react-router-dom";
// Users Routes
import NotFound from "pages/NotFound";
import AllApplication from "pages/Users/AllApplication";
import Bookings from "pages/Users/Bookings";
import BookSpaceDaily from "pages/Users/BookSpaceDaily";
import Documents from "pages/Users/Documents";
import Files from "pages/Users/Files";
import MyVotes from "pages/Users/MyVotes";
import SpaceManagement from "pages/Users/SpaceManagement";
import VoteHere from "pages/Users/VoteHere";
import Votes from "pages/Users/Votes";
import Dashboard from "../../pages/Users/Dashboard";
import MyProfile from "../../pages/Users/MyProfile";

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={Dashboard} />}
      />
      <Route
        path="/spacemanagement"
        element={<ProtectedRoute element={SpaceManagement} />}
      />
      <Route
        path="/bookspacedaily"
        element={<ProtectedRoute element={BookSpaceDaily} />}
      />
      <Route
        path="/documents"
        element={<ProtectedRoute element={Documents} />}
      />
      <Route
        path="/votehere"
        element={<ProtectedRoute element={VoteHere} />}
      />
      <Route path="/files" element={<ProtectedRoute element={Files} />} />
      <Route path="/votes" element={<ProtectedRoute element={Votes} />} />
      <Route path="/myvotes" element={<ProtectedRoute element={MyVotes} />} />
      <Route path="/allapplication" element={<ProtectedRoute element={AllApplication} />} />
      <Route path="/bookings" element={<ProtectedRoute element={Bookings} />} />
      <Route path="/myProfile" element={<ProtectedRoute element={MyProfile} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default ProjectRoutes;
