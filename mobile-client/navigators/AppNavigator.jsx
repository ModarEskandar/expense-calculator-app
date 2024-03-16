import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SigninScreen, SignupScreen,HomeScreen, ExpenseScreen, AddExpenseScreen } from "../screens";

import LoadingComponent from "../components/LoadingComponent";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Expense"
        component={ExpenseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Loading"
        component={LoadingComponent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
