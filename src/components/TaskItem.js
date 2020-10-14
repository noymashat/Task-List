import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import firebase from "../../database/firebase";

export const TaskItem = props => {
	const [checked, setChecked] = useState(props.checked);
	const userID = firebase.auth().currentUser.uid; // get userID from firebase

	const changeChecked = id => {
		console.log("------Check:\n", props.taskList);
		const ch = !checked;
		var tasks = [...props.taskList];
		let task = tasks.find((taskObj, i) => {
			if (taskObj.key === id) {
				tasks[i].checked = ch;
				return taskObj; // stop searching
			}
		});
		props.changeTaskList(tasks);
		props.updateTask(task.key, task.task, task.date, task.checked);
		setChecked(!checked);
	};

	// Pressing 'Delete' button removes a selected task. Update state and call delTask.
	const deleteTask = id => {
		console.log("delete:", id);
		var tasks = [...props.taskList];
		console.log("from delete1:\n", tasks);
		tasks = tasks.filter(task => id !== task.key);
		console.log("from delete2:\n", tasks);
		props.changeTaskList(tasks);
		// this.change(tasks);
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

	const styles = Platform.OS === "ios" ? stylesIos : stylesAndroid;
	return (
		<View style={styles.view1}>
			<View style={styles.view2}>
				<CheckBox
					checked={checked}
					checkedColor={"black"}
					style={styles.checkbox}
					onIconPress={() => {
						changeChecked(props.keyval, !checked);
						// this.setState({ checked: !this.state.checked });
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
						deleteTask(props.keyval);
						// this.setState({ checked false });
					}}
				/>
			</View>
			<View style={styles.date}>
				<Text style={styles.dateText}>{props.val.date}</Text>
			</View>
		</View>
	);
};

const stylesAndroid = StyleSheet.create({
	view1: {
		flex: 1,
		// flexDirection: "column",
		borderTopWidth: 0.5,
		width: "100%"
	},
	view2: {
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		justifyContent: "center"
	},
	checkbox: {
		padding: 0,
		flexDirection: "row",
		alignItems: "center"
	},
	icon: {
		padding: 10,
		alignSelf: "flex-end"
	},
	textInput: {
		width: 200,
		padding: 10,
		fontSize: 18,
		borderBottomWidth: 1
	},
	checkedText: {
		fontSize: 18,
		textDecorationLine: "line-through",
		textDecorationStyle: "solid",
		fontWeight: "bold",
		width: 200,
		paddingTop: 15
	},
	taskText: {
		fontSize: 18,
		fontWeight: "bold",
		width: 200,
		paddingTop: 15
	},
	date: {
		flex: 1,
		paddingLeft: 50
	},
	dateText: {
		paddingLeft: 15,
		fontSize: 14
	}
});

const stylesIos = StyleSheet.create({
	view1: {
		flex: 1,
		// flexDirection: "column",
		borderTopWidth: 0.5,
		width: "100%"
	},
	view2: {
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		justifyContent: "center"
	},
	checkbox: {
		padding: 0,
		flexDirection: "row",
		alignItems: "center"
	},
	icon: {
		padding: 10,
		alignSelf: "flex-end"
	},
	textInput: {
		// paddingLeft: 65,
		width: 200,
		padding: 10,
		fontSize: 18,
		borderBottomWidth: 1
	},
	checkedText: {
		fontSize: 18,
		textDecorationLine: "line-through",
		textDecorationStyle: "solid",
		fontWeight: "bold",
		width: 200,
		paddingTop: 15
	},
	taskText: {
		fontSize: 18,
		fontWeight: "bold",
		width: 200,
		paddingTop: 15
	},
	date: {
		flex: 1,
		paddingLeft: 50
	},
	dateText: {
		paddingLeft: 15,
		fontSize: 14
	}
});
