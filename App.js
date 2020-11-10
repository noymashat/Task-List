import React, { Component } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { Root } from "native-base";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./src/navigation/StackNavigation";

const Drawer = createDrawerNavigator();


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
					<View style={{ flex: 1 }}>
						<NavigationContainer>
							<StackNavigator />
						</NavigationContainer>
					</View>
				</Root>
			);
		}
	}
}
