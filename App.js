import React, { Component } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { Root } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TaskListScreen from "./src/views/TaskListScreen";
import SignInScreen from "./src/views/SignInScreen";
import SignUpScreen from "./src/views/SignUpScreen";

const Stack = createStackNavigator();

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}
	// Fix missing font warnnings
	async componentDidMount() {
		await Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
		});
		this.setState({ loading: false });
	}

	// If the app is still loding, render a React component
	// that tells Expo to keep the app's loading screen open
	render() {
		if (this.state.loading) {
			return (
				<Root>
					<AppLoading />
				</Root>
			);
		} else {
			// navigation is initiated with sign in page
			return (
				<Root>
					<NavigationContainer>
						<Stack.Navigator initialRouteName="Sign In">
							<Stack.Screen name="Sign Up" component={SignUpScreen} />
							<Stack.Screen name="Sign In" component={SignInScreen} />
							<Stack.Screen name="Task List" component={TaskListScreen} />
						</Stack.Navigator>
					</NavigationContainer>
				</Root>
			);
		}
	}
}
