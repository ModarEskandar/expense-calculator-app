import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useCreateUserAccount, useSignInAccount } from '../lib/react-query/queries';
import AppContext from '../AppContext';
import { INewUser } from '../types';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninSchema } from '../lib/vlaidations';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../AuthContext';

const SigninScreen = () => {

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
  useSignInAccount();
  const navigation = useNavigation();

  const {control,handleSubmit } = useForm({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const {isLoggedIn,setIsLoggedIn,setUserDetails,userDetails} = useContext(AppContext);
  const {isLoggedIn,setIsLoggedIn,setUserDetails,userDetails} = useUserContext();

  async function onSubmitHandler(values: z.infer<typeof SigninSchema>) {
    
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session)
      return;
    await setIsLoggedIn(true);
    navigation.navigate('Home');
    
    // const isLoggedIn = await checkAuthUser();
    // if (isLoggedIn) {
    //   control._reset()
    //   // redirect("/expenses");
    // } 
    // else
    //   return toast({
    //     title: "Sign up failed. Please try again later.",
    //   });
  }
  return (
    <View style={[styles.container,{paddingVertical:"40%"}]}>
        <View style={[styles.card,{paddingVertical:"20%"}]}>
          
          <Text style={styles.helloText}> Signin using your account</Text>
          <Text style={styles.message}>Enter your account details</Text>

          <Controller
          control={control}
          name={'email'}
          render={({ field: { value, onChange, onBlur },fieldState: { error }})=>(
            <>
            <Text style={styles.errorMessage}>
            {error && error.message}
                  </Text>
                  <TextInput
            placeholder='email'
            keyboardType="email-address"
            style={styles.textInput}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            />
            
            </>)}
            />
                    
            <Controller
          control={control}
          name={'password'}
          render={({ field: { value, onChange, onBlur },fieldState: { error }})=>(
            <>
            <Text style={styles.errorMessage}>
            {error && error.message}
                  </Text>
                  <TextInput
            placeholder='password'
            secureTextEntry={true}
            style={styles.textInput}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            />
            
            </>)}
            /> 
            
            
          <TouchableOpacity  onPress={handleSubmit(onSubmitHandler)}  disabled={false} style={ [styles.submitBtn,{ opacity: true ? 1 : 0.5 }]}>
              <Text >Signin</Text>
          </TouchableOpacity>
          <View style={styles.formFooter}>
          <Text style={{ color: 'white' }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text
            style={{ marginStart: 5, color: 'purple', fontWeight: "500" }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>         
          </View>
          

        </View>
    </View>
  );
}

export default SigninScreen
