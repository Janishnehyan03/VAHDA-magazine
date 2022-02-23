import { createContext, useEffect, useState } from "react";
import Axios from "../Axios";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const checkUserLoggedIn = async () => {
    try {
      const response = await Axios.post("/users/checkLoggedIn");
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ user,setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
