import React from 'react';
import { useSelector } from 'react-redux';

export default function useCurrentUser() {
  const user_token = useSelector((state) => state.authenticationReducer.userAccessToken || {});
  const user_type = useSelector((state) => state.authenticationReducer.userType || {});
  const user_data = useSelector((state) => state.authenticationReducer.userData || {});

  const userData = React.useMemo(() => user_data, [user_data]);
  const userType = React.useMemo(() => user_type, [user_type]);
  const userToken = React.useMemo(() => user_token, [user_token]);

  return {
    userData,
    userType,
    userToken,
  };
}
