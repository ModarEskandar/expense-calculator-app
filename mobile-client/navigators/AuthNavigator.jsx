import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SigninScreen, SignupScreen } from "../screens";

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
      />
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
