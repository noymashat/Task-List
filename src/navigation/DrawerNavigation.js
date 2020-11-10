import React from "react";
import { Text, Button, View, TouchableOpacity, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TaskListScreen } from "../views/TaskListScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import SignOut from "../components/SignOut";
import SignInScreen from "../views/SignInScreen";

const Drawer = createDrawerNavigator();

const HeaderLeft = () => {
	const navigation = useNavigation();
	return (
		<View style={{ flexDirection: "row" }}>
			<MaterialIcons
				name="menu"
				size={34}
				color="black"
				onPress={() => {
					navigation.dispatch(DrawerActions.toggleDrawer());
				}}
				style={{ paddingLeft: 15 }}
			/>
		</View>
	);
};

const DrawerNavigator = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Task List" component={TaskListScreen} />
			<Drawer.Screen
				name="Sign Out"
				// onPress={SignOut}
				component={SignOut}
			/>
		</Drawer.Navigator>
	);
};

export { DrawerNavigator, HeaderLeft };
