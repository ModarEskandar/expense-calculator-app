import { createContext, useContext, useEffect, useState } from "react";
import { IContextType, IUser } from "./types";
import { getCurrentUser, setAuthToken } from "./lib/api";
import * as SecureStore from 'expo-secure-store';
import { decode } from 'base-64';

const INITIAL_USER = {
  _id: "",
  name: "",
  email: "",

};

const INITIAL_STATE = {
    userDetails: INITIAL_USER,
  isLoading: false,
  isLoggedIn: false,
  setUserDetails: () => {},
  setIsLoggedIn: () => {},
  checkAuthUser: async () => false as boolean,
  token:'',
  setToken:()=>{}
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetails] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkAuthUser = async () => {
    try {      
      const currentAccount = await getCurrentUser() as unknown as IUser;
            
      if (currentAccount) {        
        setUserDetails({
          _id: currentAccount._id,
          name: currentAccount.name,
          email: currentAccount.email
        });
        
        setIsLoggedIn(true);       
        return true;
      }
      
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  useEffect(() => {

    const accessToken = SecureStore.getItem('token');

    if (!accessToken) {
      setIsLoggedIn(false);
    }
   
    const decodedJwt =accessToken?JSON.parse(decode(accessToken.split(".")[1])):{exp:Date.now()};
    
    if (decodedJwt.exp * 1000 < Date.now()) {
      
      setIsLoggedIn(false);
    }
    setAuthToken(accessToken!);     
    checkAuthUser();
  }, []);

  const value = {
    userDetails,
    setUserDetails,
    isLoading,
    setIsLoading,
    isLoggedIn,
    setIsLoggedIn,
    checkAuthUser,

  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);

