import React from "react";
import {
	Text,
	Button,
	View,
	TouchableOpacity,
	Image,
	TextInput,
	Alert
} from "react-native";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem
} from "@react-navigation/drawer";
import { TaskListScreen } from "../views/TaskListScreen";
import { ListsScreen } from "../views/ListsScreen";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import SignOut from "../components/SignOut";
import SignInScreen from "../views/SignInScreen";
import Animated from "react-native-reanimated";

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

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem label="Add New List" onPress={() => <Alert>Hi</Alert>} />
		</DrawerContentScrollView>
	);
}

const DrawerNavigator = () => {
	return (
		<Drawer.Navigator
			drawerContent={props => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen name="Task List" component={TaskListScreen} />
			<Drawer.Screen name="Lists" component={ListsScreen} />

			<Drawer.Screen name="Sign Out" component={SignOut} />
		</Drawer.Navigator>
	);
};

export { DrawerNavigator, HeaderLeft };
