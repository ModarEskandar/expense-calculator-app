import { Expense, INewExpense, INewUser, IUpdateExpense, IUser } from "../../types";
import axios from "./axios";
import { CATEGORIES_URL, EXPENSES_URL, ME_URL, RESET_PASSWORD_REQUEST_URL, SIGNIN_URL, SIGNUP_URL } from "../../constants";
import * as SecureStore from 'expo-secure-store';

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.request && error.request.status === 401) {
      signOutUser();
      // // Set Failed Request
      // let failedRequest = error.config;
      
      // //Method to get new token
      // return renewUserToken().then(response => {
      //   // Set axios instance header
      //   axios.defaults.headers['Authorization'] = 'Bearer ' + response.token;
        
      //   // Set failed request header
      //   failedRequest.headers['Authorization'] = 'Bearer ' + response.token;
        
      //   //Retry failed request
      //   return axios.request(failedRequest);
      // });
    }
    throw error;
  },
);
// Set the JWT token as a default header after login
export const setAuthToken = (token:string) => {  
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export async function createNewUserAccount(user: INewUser) {    
    try {
      
      const newUser = await axios.post(
        SIGNUP_URL,JSON.stringify({ ...user}),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );      
      if (!newUser) throw Error;
      
      return newUser;
    } catch (error:any) {
      if (error?.response?.status === 409) {
        console.log("Email Already Exist Taken",error);
      } else {
        console.log("Registration Failed",error);
      }
    }
  }

  export async function signInUser( email: string, password: string ) {
    try {

      const response = await axios.post(SIGNIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const accessToken = response?.data?.accessToken;
        await SecureStore.setItemAsync('token', accessToken);
        setAuthToken(accessToken);

      return accessToken;
    } catch (error:any) {
      console.log("Signin Failed, please check your credetials",error);

    }
  }

  export async function resetPassword( user: Partial<INewUser>) {
    try {
      const response = await axios.post(RESET_PASSWORD_REQUEST_URL,
        JSON.stringify({ ...user }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

      return response;
    } catch (error:any) {
      console.log("Somthing went wrong: ",error.message);

    }
  }

  export async function signOutUser() {
    try {
      await SecureStore.deleteItemAsync('token');
      setAuthToken('');
    } catch (error) {
      console.log(error);
    }
  }
  
  export const getCurrentUser = async () => {
    
    try {
        
      const currentAccount = axios.get(ME_URL).then(response=>{
        return response.data.data.user;

      });
  
      if (!currentAccount) throw Error;
      return currentAccount;
    } catch (error) {
      console.log(error);
    }
  };

  export const createNewExpense = async (expense: INewExpense) => {
    try {      
        const newExpense = await axios.post(EXPENSES_URL,
            JSON.stringify({ ...expense }),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
      );
      if (!newExpense) {
        throw Error;
      }
  
      return newExpense;
    } catch (error) {
      console.log(error);
    }
  };

  export async function updateExpense(expense: IUpdateExpense) {  
    try {     
      //  Update expense
      const updatedExpense = await axios.put(EXPENSES_URL+'/'+expense._id,
        JSON.stringify(expense),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
  );
  
      // Failed to update
      if (!updatedExpense) {
  
        throw Error;
      }  
      return updatedExpense;
    } catch (error) {
      console.log(error);
    }
  }

  export async function deleteExpense(expenseId?: string) {
  
    try {
      const statusCode = await axios.delete(EXPENSES_URL+'/'+expenseId,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
  );
  
      if (!statusCode) throw Error;
    
      return { status: "Ok" };
    } catch (error) {
      console.log(error);
    }
  }

  export const getCategories = async () => {
    const categories = await axios.get(
      CATEGORIES_URL
).then(response=>
  {    
    return response.data.data.categories;
  } 
);

    if (!categories) throw Error;
    return categories;
  };

  export const getRecentExpenses = async () => {

    const expenses = await axios.get(
      EXPENSES_URL,{
        params: {
          limit: 20
          }
      }
).then(response=>
  {
    return response.data.data.expenses;

  } 
  
);
if (!expenses) throw Error;
    return expenses;}

  export const getExpenses = async () => {
    const expenses = await axios.get(
      EXPENSES_URL
).then(response=>
  {
    return response.data.data.expenses;

  } 
);

    if (!expenses) throw Error;
    return expenses;
  };

  export async function getExpenseById(expenseId?: string) {
  
    try {
      const expense = await axios.get(EXPENSES_URL+'/'+expenseId,{
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }).then(data=>{        
       return data.data.data.expense});
      
  
      if (!expense) throw Error;      
      return expense as unknown as Expense;
    } catch (error) {
      console.log(error);
    }
  }