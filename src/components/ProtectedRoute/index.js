import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ADMIN_ROUTES, USER_ROUTES, USER_TYPE } from "../../constant";
import useCurrentUser from "../../hooks/useCurrentUser";
import { encryptStorage } from "../../util/encryptStorage";

export const ProtectedRoute = ({ element: Element }) => {
  const { pathname } = useLocation();
  const accesstoken = encryptStorage.get("access_token");
  const { userType } = useCurrentUser();
  if (
    !accesstoken && (ADMIN_ROUTES.includes(pathname) || USER_ROUTES.includes(pathname))
  ) {
    return <Navigate to="/" />;
  }
  else if (accesstoken && userType === USER_TYPE?.User && USER_ROUTES.includes(pathname)) {
    return <Element />;
  }
  else if (accesstoken && userType === USER_TYPE?.Admin && ADMIN_ROUTES.includes(pathname)) {
    return <Element />;
  }
  else {
    return <Navigate to="*" />;
  }
};
