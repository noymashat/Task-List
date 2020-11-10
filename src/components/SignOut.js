import React, { useEffect } from "react";
import { View } from "react-native";
import firebase from "../../database/firebase";
import { useNavigation } from "@react-navigation/native";

export default SignOut = () => {
	const navigation = useNavigation();

	useEffect(() => {
		firebase
			.auth()
			.signOut()
			.then(function() {
				navigation.navigate("Sign In");
			})
			.catch(function(error) {
				console.log(error);
			});
	}, []);
	return <View></View>;
};
