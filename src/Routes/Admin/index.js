import React from "react";
import { ProtectedRoute } from "../../components";
// Admin page Routes
import ATS from "pages/Admin/ATS";
import ATSFlutter from "pages/Admin/ATSFlutter";
import BookSpaceDaily from "pages/Admin/BookSpaceDaily";
import BookSpaceMonthly from "pages/Admin/BookSpaceMonthly";
import BookSpaceWeekly from "pages/Admin/BookSpaceWeekly";
import DataSettings from "pages/Admin/DataSettings";
import Documents from "pages/Admin/Documents";
import DocumentsOne from "pages/Admin/DocumentsOne";
import EmployeeList from "pages/Admin/EmployeeList";
import EmployeePage from "pages/Admin/EmployeePage";
import Files from "pages/Admin/Files";
import FilesOne from "pages/Admin/FilesOne";
import Invitation from "pages/Admin/Invitation";
import ResourceData from "pages/Admin/ResourceData";
import SpaceManagement from "pages/Admin/SpaceManagement";
import ToolSettings from "pages/Admin/ToolSettings";
import ViewBooking from "pages/Admin/ViewBooking";
import NotFound from "pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Admin/Dashboard";
import MyProfile from "../../pages/Admin/MyProfile";

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={Dashboard} />}
      />
      <Route
        path="/employeelist"
        element={<ProtectedRoute element={EmployeeList} />}
      />
      <Route
        path="/documents"
        element={<ProtectedRoute element={Documents} />}
      />
      <Route
        path="/documentsone"
        element={<ProtectedRoute element={DocumentsOne} />}
      />
      <Route path="/files" element={<ProtectedRoute element={Files} />} />
      <Route path="/filesone" element={<ProtectedRoute element={FilesOne} />} />
      <Route
        path="/spacemanagement"
        element={<ProtectedRoute element={SpaceManagement} />}
      />
      <Route
        path="/bookspacedaily"
        element={<ProtectedRoute element={BookSpaceDaily} />}
      />
      <Route
        path="/bookspaceweekly"
        element={<ProtectedRoute element={BookSpaceWeekly} />}
      />
      <Route
        path="/bookspacemonthly"
        element={<ProtectedRoute element={BookSpaceMonthly} />}
      />
      <Route
        path="/viewbooking"
        element={<ProtectedRoute element={ViewBooking} />}
      />
      <Route
        path="/employeepage"
        element={<ProtectedRoute element={EmployeePage} />}
      />
      <Route
        path="/invitation"
        element={<ProtectedRoute element={Invitation} />}
      />
      <Route
        path="/toolsettings"
        element={<ProtectedRoute element={ToolSettings} />}
      />
      <Route
        path="/datasettings"
        element={<ProtectedRoute element={DataSettings} />}
      />
      <Route
        path="/resourcedata"
        element={<ProtectedRoute element={ResourceData} />}
      />
      <Route
        path="/ats"
        element={<ProtectedRoute element={ATS} />}
      />

      <Route path="/atsflutter"
        element={<ProtectedRoute element={ATSFlutter} />}
      />
      <Route path="/myProfile"
        element={<ProtectedRoute element={MyProfile} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProjectRoutes;
