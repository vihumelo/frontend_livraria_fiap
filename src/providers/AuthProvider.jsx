import React from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

export const AuthContext = React.createContext({
  token: null,
  setToken: () => {},
  removeToken: () => {},
});

export default function AuthProvider({ children }) {
  const [cookies, setToken, removeToken] = useCookies(['token']);

  return (
    <AuthContext.Provider
      value={{
        token: cookies.token,
        setToken,
        removeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
