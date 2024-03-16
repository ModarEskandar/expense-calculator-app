import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AppContext from './AppContext';
import { AppNavigator, AuthNavigator, MainNavigator } from './navigators';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getCurrentUser, setAuthToken } from './lib/api';
import { IUser } from './types';
import * as SecureStore from 'expo-secure-store';
import { decode } from 'base-64';
import { PaperProvider } from 'react-native-paper';


const queryClient = new QueryClient();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
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
  

  return (
    <AppContext.Provider value={{isLoggedIn ,setIsLoggedIn, userDetails}}>
          <PaperProvider>

    <NavigationContainer >
        <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <AppNavigator />
        {/* {(isLoggedIn ) ? <MainNavigator /> : <AuthNavigator />} */}
        </QueryClientProvider>

      </NavigationContainer>
      </PaperProvider>

  </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});