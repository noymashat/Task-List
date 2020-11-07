import React, { Component, useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	ImageBackground,
	Image,
	Platform
} from "react-native";
import firebase from "../../database/firebase";
// import { TaskList } from "../components/TaskList";
import { AddTask } from "../components/AddTask";
import { FlatList } from "react-native-gesture-handler";
import { TaskContainer } from "../components/TaskContainer";
import BG from "../../assets/BG.png";

<script src="http://10.100.102.201:8097"></script>;

export const TaskListScreen = () => {
	const [taskList, setTaskList] = useState([]);
	const userID = firebase.auth().currentUser.uid;

	useEffect(() => {
		var tasks = [];
		firebase
			.database()
			.ref(`Tasks/${userID}/`)
			.once("value", snapshot => {
				snapshot.forEach(function(childSnapshot) {
					var childKey = childSnapshot.key;
					var childData = childSnapshot.val();
					tasks.push({
						key: childKey,
						date: childData.date,
						task: childData.task,
						checked: childData.checked
					});
				});
				setTaskList(tasks.reverse());
			});
	}, []);

	const changeTaskList = tasks => {
		const task = tasks;
		setTaskList(task);
	};

	// const styles = Platform.OS === "ios" ? stylesIos : stylesAndroid;
	return (
		<View style={styles.container}>
			<ImageBackground style={styles.image} source={BG}>
				<View style={styles.view1}>
					<FlatList
						data={taskList}
						renderItem={({ item }) => {
							return (
								<View>
									<TaskContainer
										val={item}
										taskList={taskList}
										changeTaskList={changeTaskList}
										checked={item.checked}
									/>
									<Text></Text>
								</View>
							);
						}}
						keyExtractor={item => item.key}
					/>
					<AddTask changeTaskList={changeTaskList} taskList={taskList} />
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	view1: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		marginTop: Platform.OS === "ios" ? undefined : 80
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	image: {
		height: "100%",
		width: "100%"
	}
});
