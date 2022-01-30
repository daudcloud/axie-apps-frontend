import { useContext, createContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Router from "next/router";

const UserContext = createContext();
const UserUpdateContext = createContext();

export const useUser = () => {
  return [useContext(UserContext), useContext(UserUpdateContext)];
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) return setUser(null);

    const { _user } = jwt.verify(token, "daudsutanto1212");
    setUser(_user);
  }, []);
  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={setUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
