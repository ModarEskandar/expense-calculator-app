import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useCreateUserAccount, useSignInAccount } from '../lib/react-query/queries';
import AppContext from '../AppContext';
import { INewUser } from '../types';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '../lib/vlaidations';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
    const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
  useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
  useSignInAccount();
  const {control,handleSubmit } = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm:""
    },
  });
  const {isLoggedIn,setIsLoggedIn,setUserDetails,userDetails} = useContext(AppContext);
  const navigation = useNavigation();

  async function onSubmitHandler(values: z.infer<typeof SignupSchema>) {
    const newUser = await createUserAccount(values);
    
    if (!newUser)
      return;
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session)
      return;
    await setIsLoggedIn(true);
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
    <View style={[styles.container,{paddingVertical:"20%"}]}>
        <View style={[styles.card,{paddingVertical:"5%"}]}>
          
          <Text style={styles.helloText}> Create a new account</Text>
          <Text style={styles.message}>Enter your details</Text>

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
            style={styles.textInput}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            />
            
            </>)}
            />
          <Controller
          control={control}
          name={'name'}
          render={({ field: { value, onChange, onBlur },fieldState: { error }})=>(
            <>
            <Text style={styles.errorMessage}>
            {error && error.message}
                  </Text>
                  <TextInput
            placeholder='name'
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
            
            <Controller
          control={control}
          name={'passwordConfirm'}
          render={({ field: { value, onChange, onBlur },fieldState: { error }})=>(
            <>
             <Text style={styles.errorMessage}>
            {error && error.message}
                  </Text>
        <TextInput
            placeholder='Confirm password'
            secureTextEntry={true}
            style={styles.textInput}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            />
            
            </>
            
            )}
            />
          <TouchableOpacity  onPress={handleSubmit(onSubmitHandler)}  disabled={false} style={ [styles.submitBtn,{ opacity: true ? 1 : 0.5 }]}>
              <Text >Signup</Text>
          </TouchableOpacity>
          <View style={styles.formFooter}>
          <Text style={{ color: 'white' }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <Text
            style={{ marginStart: 5, color: 'purple', fontWeight: "500" }}
          >
            Sign In
          </Text>
        </TouchableOpacity>         
          </View>
        </View>
    </View>
  );
}

export default SignupScreen

// const screenWidth = Dimensions.get("screen").width;
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#ffff",
//       alignItems: "center",
//     },
//     card: {
//       flex: 1,
//       backgroundColor: "#1f1f1f",
//       width: '90%',
//       marginTop: '20%',
//       borderRadius: 20,
//       maxHeight: 500,
//       padding: '10%',
//   },
//     helloText: {
//       color: "white",
//       marginBottom: 30,
//       fontSize: 25,
//       textAlign:'center'
//     },
//     textInput: {
//       padding: 5,
//       paddingStart: 15,
//       backgroundColor: "#3b3b3b",
//       width: screenWidth * 0.7,
//       borderRadius: 15,
//       marginBottom: 15,
//       color: "white",
//       fontWeight: "600",
//     },
//     submitBtn: {
//       paddingHorizontal: 25,
//       paddingVertical: 10,
//       backgroundColor: "purple",
//       borderRadius: 25,
//       color: "white",
//       textAlign: "center",
//       marginVertical: 15,
//       alignItems:'center'
//     },
//     buttonAlt: {
//       width: '80%',
//       borderWidth: 1,
//       height: 40,
//       borderRadius: 50,
//       borderColor: 'black',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginVertical: 5,
//   },
//     welcomeText: {
//       color: "white",
//       marginBottom: 20,
//       fontSize: 30,
//     },
//     message: {
//       fontSize: 16,
//       marginVertical: '5%',
//   },
//   errorMessage: {
//     fontSize: 12,
//     color:'red'
// },
//   });