import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useCreateUserAccount, useSignInAccount } from '../lib/react-query/queries';
import AppContext from '../AppContext';
import { INewUser } from '../types';

const SignupScreen = () => {
    const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
  useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
  useSignInAccount();
  const {isLoggedIn,setIsLoggedIn,setUserDetails,userDetails} = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<INewUser>({name:'', email:'', password:'',passwordConfirm:''}); 
  const [values, setValues] = useState<INewUser>({name:'', email:'', password:'',passwordConfirm:''}); 
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => { 
  
    setValues({name, email, password,passwordConfirm});

    
    validateForm(); 
}, [name, email, password,passwordConfirm]);
const validateForm = () => { 
  let formValidationErrors = errors;  
  formValidationErrors.email='wow'
  console.log(formValidationErrors);
  console.log(errors);
  
  // Validate name field 
  if (!name) {
    formValidationErrors={...errors,name:'Name is required.'}
  }
  else {
    formValidationErrors={...errors,name:''}
  }

  // Validate email field 
  if (!email) { 
    setErrors({...errors,email:'Email is required.'})
  } else if (!/\S+@\S+\.\S+/.test(email)) { 
      setErrors({...errors,email:'Email is invalid.'})
  } else {
    setErrors({...errors,email:''})
  }

  // Validate password field 
  if (!password) { 
    setErrors({...errors,password:'Password is required.'})
  } else if (password.length < 6) { 
    setErrors({...errors,password:'Password must be at least 6 characters.'})
  } else {
    setErrors({...errors,password:''})
  }

  // Validate password field 
  if (!passwordConfirm) {
    setErrors({...errors,passwordConfirm:'Password confirm is required.'})
  } else if (passwordConfirm.length < 6) { 
  setErrors({...errors,passwordConfirm:'Password must be at least 6 characters.'})
  } else if(password!==passwordConfirm)
  setErrors({...errors,passwordConfirm:'Passwords are not matched'})
  else {
    setErrors({...errors,passwordConfirm:''})
  }

  // Set the errors and update form validity 
  setErrors(formValidationErrors);
  setIsFormValid(Object.keys(errors).length === 0); 

}; 
async function onSubmitHandler() {
  const values:INewUser = {name, email, password,passwordConfirm};
  return
  const newUser = await createUserAccount(values);
  
  // if (!newUser)
  //   return toast({
  //     title: "Sign up failed. Please try again later.",
  //   });
  const session = await signInAccount({
    email,
    password
  });

  // if (!session)
  //   return toast({
  //     title: "Sign in failed. Please try again later.",
  //   });
  // const isLoggedIn = await checkAuthUser();
  setIsLoggedIn(true);
  // if (isLoggedIn) {
  //   form.reset();
  //   redirect("/expenses");
  // } else
  //   return toast({
  //     title: "Sign up failed. Please try again later.",
  //   });
}
  return (
    <View style={styles.container}>
        <View style={styles.card}>
          
          <Text style={styles.helloText}> Create a new account</Text>
          <TextInput style={styles.textInput} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
          <TextInput style={styles.textInput} placeholder="Name" onChangeText={setName}></TextInput>
          <TextInput secureTextEntry={true} style={styles.textInput} placeholder="Password" onChangeText={setPassword}></TextInput>
          <TextInput secureTextEntry={true} style={styles.textInput} placeholder="Confirm Password" onChangeText={setPasswordConfirm}></TextInput>
          <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? errors.name : null}</Text>
          <TouchableOpacity  onPress={onSubmitHandler}  disabled={!isFormValid} style={ [styles.submitBtn,{ opacity: isFormValid ? 1 : 0.5 }]}>
              <Text >Signup</Text>
          </TouchableOpacity>
                      

        </View>
    </View>
  );
}

export default SignupScreen

const screenWidth = Dimensions.get("screen").width;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffff",
      alignItems: "center",
      // justifyContent: 'center',
      // paddingTop: a,
    },
    card: {
      flex: 1,
      backgroundColor: "#1f1f1f",
      width: '90%',
      marginTop: '40%',
      borderRadius: 20,
      maxHeight: 400,
      padding: '10%',
  },
    helloText: {
      color: "white",
      marginBottom: 30,
      fontSize: 25,
      textAlign:'center'
    },
    textInput: {
      padding: 5,
      paddingStart: 15,
      backgroundColor: "#3b3b3b",
      width: screenWidth * 0.7,
      borderRadius: 15,
      marginBottom: 15,
      color: "white",
      fontWeight: "600",
    },
    submitBtn: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      backgroundColor: "purple",
      borderRadius: 25,
      color: "white",
      textAlign: "center",
      marginBottom: 15,
      alignItems:'center'
    },
    buttonAlt: {
      width: '80%',
      borderWidth: 1,
      height: 40,
      borderRadius: 50,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
  },
    welcomeText: {
      color: "white",
      marginBottom: 20,
      fontSize: 30,
    },
    message: {
      fontSize: 16,
      marginVertical: '5%',
  },
  });