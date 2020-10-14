import React, { Component } from "react";
import firebase from "../../database/firebase";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default class AddTask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskText: "",
			userID: firebase.auth().currentUser.uid // get userID from firebase
		};
	}

	// Push task to user's task list in the database
	pushTask() {
		if (this.state.taskText) {
			var d = new Date();
			var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
			var task = this.state.taskText;
			var checked = false;
			firebase
				.database()
				.ref(`Tasks/${this.state.userID}/`)
				.push({
					task,
					date,
					checked
				})
				.then(res => {
					this.addTask(res.key, date, task, checked);
					console.log("Task was added to database");
				})
				.catch(error => {
					console.log("error ", error);
				});
		}
	}

	// Pressing '+' button adds a new task. Update state with new values and call push task.
	addTask(key, date, task, checked) {
		console.log("add task:", this.props.taskList);
		var tasks = [...this.props.taskList];
		tasks.push({
			key,
			date,
			task,
			checked
		});
		this.props.changeTaskList(tasks);
		this.setState({ taskText: "" });
	}

	render() {
		const styles = Platform.OS === "ios" ? stylesIos : stylesAndroid;
		return (
			<View style={{ position: "relative", marginTop: 50 }}>
				<TextInput
					style={this.props.styles.textInput}
					onChangeText={taskText => this.setState({ taskText })}
					value={this.state.taskText}
					placeholder="New Task"
					onSubmitEditing={this.pushTask.bind(this)}
				/>
				<MaterialIcons
					name="add"
					size={24}
					color="black"
					onPress={this.pushTask.bind(this)}
					style={styles.addButton}
				/>
			</View>
		);
	}
}

const stylesAndroid = StyleSheet.create({
	addButton: {
		position: "absolute",
		zIndex: 11,
		right: 5,
		bottom: 23
	}
});

const stylesIos = StyleSheet.create({
	addButton: {
		position: "absolute",
		zIndex: 11,
		right: 5,
		bottom: 23
	}
});
