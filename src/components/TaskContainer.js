import React, { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import firebase from "../../database/firebase";
import { EditTask } from "./EditTask";
import { TaskItem } from "./TaskItem";
import TASK from "../../assets/task.jpeg";

<script src="http://10.100.102.201:8097"></script>;

export const TaskContainer = props => {
	const [edit, setEdit] = useState(false);
	const userID = firebase.auth().currentUser.uid;

	const updateTask = (key, task, date, checked) => {
		var tasks = firebase.database().ref(`Tasks/${userID}/`);
		tasks
			.child(key)
			.update({ task: task, date: date, checked: checked })
			.then(function() {
				console.log("Update succeeded.");
			})
			.catch(function(error) {
				console.log("Update failed: " + error.message);
			});
	};

	const changeEdit = bool => {
		const edit = bool;
		setEdit(edit);
	};

	// const styles = Platform.OS === "ios" ? stylesIos : stylesAndroid;

	return (
		<View style={styles.view1} key={props.keyval}>
			{edit ? (
				<EditTask
					val={props.val}
					taskList={props.taskList}
					changeTaskList={props.changeTaskList}
					updateTask={updateTask}
					changeEdit={changeEdit}
				/>
			) : (
				<TaskItem
					val={props.val}
					taskList={props.taskList}
					changeTaskList={props.changeTaskList}
					changeEdit={changeEdit}
					updateTask={updateTask}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	view1: {
		flex: 1,
		backgroundColor: "rgba(249, 223, 206, 0.65)",
		borderRadius: 10,
		borderColor: "rgb(170, 100, 110)",
		borderWidth: 2
	}
});
