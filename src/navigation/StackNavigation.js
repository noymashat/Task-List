import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../views/SignInScreen";
import SignUpScreen from "../views/SignUpScreen";
import { TaskListScreen } from "../views/TaskListScreen";
import Colors from "../../colors";
import { DrawerNavigator, HeaderLeft } from "./DrawerNavigation";

const Stack = createStackNavigator();

export default StackNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Sign In">
			<Stack.Screen
				name="Sign Up"
				component={SignUpScreen}
				options={{
					title: "",
					headerStyle: {
						backgroundColor: Colors.light.headerBackground,
						shadowOpacity: 0,
						elevation: 0
					}
				}}
			/>
			<Stack.Screen
				name="Sign In"
				component={SignInScreen}
				options={{
					title: "",
					headerStyle: {
						backgroundColor: Colors.light.headerBackground,
						shadowOpacity: 0,
						elevation: 0
					}
				}}
			/>
			<Stack.Screen
				name="Drawer"
				component={DrawerNavigator}
				options={{
					title: "",
					headerStyle: {
						backgroundColor: Colors.light.headerBackground,
						shadowOpacity: 0,
						elevation: 0
					},
					headerLeft: ({}) => <HeaderLeft />
				}}
			/>
		</Stack.Navigator>
	);
};
