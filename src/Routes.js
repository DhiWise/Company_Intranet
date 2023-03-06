import ForgotPassword from "pages/ForgotPassword";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { USER_TYPE } from "./constant";
import useCurrentUser from "./hooks/useCurrentUser";
import ChangePassword from "./pages/ChangePassword";
import { logout } from "./reducers/authReducer";
import Admin from "./Routes/Admin";
import Users from "./Routes/Users";

const ProjectRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/" element={<UserRedirection />} />
        <Route path="/*" element={<Users />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/dhiwise-dashboard" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const UserRedirection = () => {
  const { userToken, userType } = useCurrentUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (userToken) {
      if (userType === USER_TYPE?.Admin) {
        navigate("/admin/dashboard")
      } else if (userType === USER_TYPE?.User) {
        navigate("/dashboard")
      }
      else {
        navigate("/signin");
        logout();
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )
}
export default ProjectRoutes;
