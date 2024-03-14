import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SigninScreen, SignupScreen } from "../screens";

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignupScreen">
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
      />
      <Stack.Screen
        name="SigninScreen"
        component={SigninScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
