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
      />
      <Stack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
      />
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
      />
      <Stack.Screen
        name="Loading"
        component={LoadingComponent}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
