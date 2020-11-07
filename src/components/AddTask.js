import React, { Component, useState } from "react";
import firebase from "../../database/firebase";
import {
	View,
	TextInput,
	StyleSheet,
	KeyboardAvoidingView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const AddTask = props => {
	const [taskText, setTaskText] = useState("");
	const userID = firebase.auth().currentUser.uid;

	// Push task to user's task list in the database
	const pushTask = () => {
		if (taskText) {
			var d = new Date();
			var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
			var task = taskText;
			var checked = false;
			firebase
				.database()
				.ref(`Tasks/${userID}/`)
				.push({
					task,
					date,
					checked
				})
				.then(res => {
					addTask(res.key, date, task, checked);
					console.log("Task was added to database");
				})
				.catch(error => {
					console.log("error ", error);
				});
		}
	};
	// Pressing '+' button adds a new task. Update state with new values and call push task.
	const addTask = (key, date, task, checked) => {
		console.log("add task:", props.taskList);
		var tasks = [...props.taskList];
		tasks.push({
			key,
			date,
			task,
			checked
		});
		props.changeTaskList(tasks);
		setTaskText("");
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={100}
			style={{ width: "100%" }}
		>
			<View style={styles.view1}>
				<TextInput
					style={styles.textInput}
					onChangeText={text => setTaskText(text)}
					value={taskText}
					placeholder="New Task"
					onSubmitEditing={pushTask}
				/>
				<MaterialIcons
					name="add"
					size={24}
					color="black"
					onPress={pushTask}
					style={styles.addButton}
				/>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	view1: {
		position: "relative",
		paddingTop: 10,
		borderColor:  "rgb(170, 100, 110)",
		borderTopWidth: 3
	},
	addButton: {
		position: "absolute",
		zIndex: 11,
		right: 15,
		bottom: 15
	},
	textInput: {
		padding: 20,
		// borderTopWidth: 3,
		// borderTopColor: "#FFFFFF",
		fontSize: 18,
		height: 60,
		borderRadius: 20,
		backgroundColor: "rgba(249, 223, 206, 0.65)"
	}
});
