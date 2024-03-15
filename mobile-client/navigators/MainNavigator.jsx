import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, ExpenseScreen, AddExpenseScreen } from "../screens";

const Stack = createNativeStackNavigator();

function MainNavigator () {
    return(
      <Stack.Navigator initialRouteName="Home">
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

    </Stack.Navigator>
    )
}
export default MainNavigator;