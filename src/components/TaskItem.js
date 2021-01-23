import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import firebase from "../../database/firebase";

export const TaskItem = props => {
	const d = props.val.date;
	const [date, setDate] = useState(new Date(d));
	const [checked, setChecked] = useState(props.val.checked);
	const userID = firebase.auth().currentUser.uid; // get userID from firebase

	// update the checked property of the task in taskList.
	const changeChecked = id => {
		var tasks = [...props.taskList];
		let task = tasks.find((taskObj, i) => {
			if (taskObj.key === id) {
				tasks[i].checked = !checked;
				return taskObj; // stop searching
			}
		});
		props.changeTaskList(tasks);
		props.updateTask(task.key, task.task, task.date, task.checked);
		setChecked(!checked);
	};

	// Pressing 'Delete' button removes a selected task. Update taskList and call delTask.
	const deleteTask = id => {
		var tasks = [...props.taskList];
		tasks = tasks.filter(task => id !== task.key);
		props.changeTaskList(tasks);
		removeTask(id);
	};

	// Remove task from database according to the key kept in the state.
	const removeTask = key => {
		var tasks = firebase.database().ref(`Tasks/${userID}/`);
		tasks
			.child(key)
			.remove()
			.then(function() {
				console.log("Remove succeeded.");
			})
			.catch(function(error) {
				console.log("Remove failed: " + error.message);
			});
	};

	return (
		<View style={styles.view1}>
			<View style={styles.view2}>
				<CheckBox
					checked={checked}
					checkedColor={"black"}
					uncheckedColor={"black"}
					onIconPress={() => {
						changeChecked(props.val.key, !checked);
					}}
				/>

				<Text style={checked ? styles.checkedText : styles.taskText}>
					{props.val.task}
				</Text>
				<AntDesign
					style={styles.icon}
					name="edit"
					size={24}
					color="black"
					onPress={() => props.changeEdit(true)}
				/>
				<AntDesign
					style={styles.icon}
					name="delete"
					size={24}
					color="black"
					onPress={() => {
						deleteTask(props.val.key);
					}}
				/>
			</View>
			<View style={styles.date}>
				<Text style={styles.dateText}>
					Due Date: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	view1: {
		flex: 1,
		// borderBottomWidth: 1,
		width: "100%"
	},
	view2: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "center"
	},
	icon: {
		padding: 10,
		alignSelf: "flex-end"
	},
	textInput: {
		width: 200,
		padding: 10,
		fontSize: 18
		// borderBottomWidth: 1
	},
	checkedText: {
		fontSize: 18,
		textDecorationLine: "line-through",
		// textDecorationStyle: "solid",
		fontWeight: "bold",
		width: 180,
		paddingTop: 15
	},
	taskText: {
		fontSize: 18,
		fontWeight: "bold",
		width: "50%",
		paddingTop: 15
	},
	date: {
		paddingLeft: 50,
		paddingBottom: 10
	},
	dateText: {
		paddingLeft: 15,
		fontSize: 14
	}
});
