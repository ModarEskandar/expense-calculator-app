import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContext from './AppContext';
import { AuthNavigator, MainNavigator } from './navigators';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  
  useEffect(() => {
    (async () => {
      try {
        const credentials = '';//await Keychain?.getGenericPassword();
        if (credentials) {
          setIsLoggedIn(true);
          setUserDetails(credentials);
        } else {
          console.log("No credentials stored");
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    })();
  }, []);
  return (
    <AppContext.Provider value={{isLoggedIn , userDetails}}>
    <NavigationContainer >
        <StatusBar style="light" />
        <QueryClientProvider client={queryClient}>

        {(isLoggedIn && userDetails) ? <MainNavigator /> : <AuthNavigator />}
        </QueryClientProvider>

      </NavigationContainer>
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