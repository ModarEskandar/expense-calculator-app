import React, { useState,useContext } from 'react';

import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Dimensions } from 'react-native';
import AppContext from '../AppContext';
import { setGenericPassword } from 'react-native-keychain';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://192.168.1.5:8080/api';

// const AuthScreen = () => {

//     const [email, setEmail] = useState('');
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordConfirm, setPasswordConfirm] = useState('');

//     const [isError, setIsError] = useState(false);
//     const [message, setMessage] = useState('');
//     const [isLogin, setIsLogin] = useState(true);

//     const onChangeHandler = () => {
//         setIsLogin(!isLogin);
//         setMessage('');
//     };

//     const onLoggedIn = token => {
//         fetch(`${API_URL}/private`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`, 
//             },
//         })
//         .then(async res => { 
//             try {
//                 const jsonRes = await res.json();
//                 if (res.status === 200) {
//                     setMessage(jsonRes.message);
//                 }
//             } catch (err) {
//                 console.log(err);
//             };
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     const onSubmitHandler = () => {
//         console.log(`${API_URL}/auth/${isLogin ? 'login' : 'register'}`);
//         const payload = {
//             email,
//             name,
//             password,
//             passwordConfirm
//         };
//         console.log(payload);

//         fetch(`${API_URL}/auth/${isLogin ? 'login' : 'register'}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//         })
//         .then(async res => { 
//             try {
//                 const jsonRes = await res.json();
//                 console.log(jsonRes);
//                 if (res.status !== 200) {
//                     setIsError(true);
//                     setMessage(jsonRes.message);
//                 } else {
//                     onLoggedIn(jsonRes.token);
//                     setIsError(false);
//                     setMessage(jsonRes.message);
//                 }
//             } catch (err) {
//                 console.log(err);
//             };
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     };

//     const getMessage = () => {
//         const status = isError ? `Error: ` : `Success: `;
//         return status + message;
//     }

//     return (
//         <ImageBackground source={require('../public/assets/images/moody1.png')} style={styles.image}>
//             <View style={styles.card}>
//                 <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
//                 <View style={styles.form}>
//                     <View style={styles.inputs}>
//                         <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
//                         {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={setName}></TextInput>}
//                         <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
//                         <TextInput secureTextEntry={true} style={styles.input} placeholder="Confirm Password" onChangeText={setPasswordConfirm}></TextInput>
//                         <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
//                         <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
//                             <Text style={styles.buttonText}>Done</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
//                             <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
//                         </TouchableOpacity>
//                     </View>    
//                 </View>
//             </View>
//         </ImageBackground>
//     );
// };

// const styles = StyleSheet.create({
//     image: {
//         flex: 1,
//         width: '100%',
//         alignItems: 'center',
//     },  
//     card: {
//         flex: 1,
//         backgroundColor: 'rgba(255, 255, 255, 0.4)',
//         width: '80%',
//         marginTop: '40%',
//         borderRadius: 20,
//         maxHeight: 380,
//         paddingBottom: '30%',
//     },
//     heading: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         marginLeft: '10%',
//         marginTop: '5%',
//         marginBottom: '30%',
//         color: 'black',
//     },
//     form: {
//         flex: 1,
//         justifyContent: 'space-between',
//         paddingBottom: '5%',
//     },
//     inputs: {
//         width: '100%',
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: '10%',
//     },  
//     input: {
//         width: '80%',
//         borderBottomWidth: 1,
//         borderBottomColor: 'black',
//         paddingTop: 10,
//         fontSize: 16, 
//         minHeight: 40,
//     },
//     button: {
//         width: '80%',
//         backgroundColor: 'black',
//         height: 40,
//         borderRadius: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: '400'
//     },
//     buttonAlt: {
//         width: '80%',
//         borderWidth: 1,
//         height: 40,
//         borderRadius: 50,
//         borderColor: 'black',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
//     buttonAltText: {
//         color: 'black',
//         fontSize: 16,
//         fontWeight: '400',
//     },
//     message: {
//         fontSize: 16,
//         marginVertical: '5%',
//     },
// });

// export default AuthScreen;

const AuthScreen = () => {
    const {isLoggedIn,setIsLoggedIn,setUserDetails,userDetails} = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const getMessage = () => {
      const status = isError ? `Error: ` : `Success: `;
      return status + message;
  }
  const onChangeHandler = () => {
    setIsLogin(!isLogin);
    setMessage('');
};

const onLoggedIn = (token:string) => {
  fetch(`${API_URL}/private`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
      },
  })
  .then(async res => { 
      try {
          const jsonRes = await res.json();
          if (res.status === 200) {
              setMessage(jsonRes.message);
          }
      } catch (err) {
          console.log(err);
      };
  })
  .catch(err => {
      console.log(err);
  });
}

const onSubmitHandler = () => {
  console.log(`${API_URL}/auth/${isLogin ? 'login' : 'register'}`);
  const payload = {
      email,
      name,
      password,
      passwordConfirm
  };
  console.log(payload);

  fetch(`${API_URL}/auth/${isLogin ? 'login' : 'register'}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  })
  .then(async res => { 
      try {
          const jsonRes = await res.json();
          console.log(jsonRes);
          if (res.status !== 200) {
              setIsError(true);
              setMessage(jsonRes.message);
          } else {
              onLoggedIn(jsonRes.token);
              setIsError(false);
              setMessage(jsonRes.message);
          }
      } catch (err) {
          console.log(err);
      };
  })
  .catch(err => {
      console.log(err);
  });
};
    const handleLogin = async () => {
      const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const username = "Akshay";
      const a = await setGenericPassword(username, token);
      console.log(a);
      setIsLoggedIn(true);
      setUserDetails({token, username});
    };
    const handleLogout = async()=>{
      const logout = '';//await Keychain?.resetGenericPassword();
      console.log({logout});
      if(logout){
        setIsLoggedIn(false);
        setUserDetails({});
      }
    }
    return (
      <View style={styles.container}>
          <View style={styles.card}>
            
            <Text style={styles.helloText}>{isLogin ? 'Login' : 'Signup'}</Text>
            <TextInput style={styles.textInput} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
            {!isLogin && <TextInput style={styles.textInput} placeholder="Name" onChangeText={setName}></TextInput>}
            <TextInput secureTextEntry={true} style={styles.textInput} placeholder="Password" onChangeText={setPassword}></TextInput>
            <TextInput secureTextEntry={true} style={styles.textInput} placeholder="Confirm Password" onChangeText={setPasswordConfirm}></TextInput>
            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={onSubmitHandler}>
                            <Text style={styles.loginBtn}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                            <Text style={styles.loginBtn}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                        </TouchableOpacity>
            <Text style={styles.loginBtn} onPress={handleLogin}>
              Login
            </Text>
          </View>
      </View>
    );
  }
  export default AuthScreen
  
  const screenWidth = Dimensions.get("screen").width;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffff",
      alignItems: "center",
      // justifyContent: 'center',
      paddingTop: 250,
    },
    card: {
      flex: 1,
      backgroundColor: "#1f1f1f",
      width: '80%',
      marginTop: '40%',
      borderRadius: 20,
      maxHeight: 380,
      paddingBottom: '30%',
  },
    helloText: {
      color: "white",
      marginBottom: 20,
      fontSize: 30,
    },
    textInput: {
      padding: 5,
      paddingStart: 15,
      backgroundColor: "#3b3b3b",
      width: screenWidth * 0.8,
      borderRadius: 25,
      marginBottom: 15,
      color: "white",
      fontWeight: "600",
    },
    loginBtn: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      backgroundColor: "#ff1178",
      borderRadius: 25,
      color: "white",
      textAlign: "center",
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
    logoutBtn: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      backgroundColor: "#ff1178",
      borderRadius: 25,
      color: "white",
      textAlign: "center",
    },
    message: {
      fontSize: 16,
      marginVertical: '5%',
  },
  });