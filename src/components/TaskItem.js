import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { CheckBox } from "react-native-elements";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import firebase from "../../database/firebase";

<script src="http://10.100.102.201:8097"></script>;

export default class TaskItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: false,
			edit: false,
			text: "",
			userID: firebase.auth().currentUser.uid // get userID from firebase
		};
		this.editTask.bind(this);
		this.deleteTask.bind(this);
	}

	editTask(id) {
		var tasks = [...this.props.taskList];
		var updatedKey = tasks[id].key;
		console.log(updatedKey);
		var d = new Date();
		var task = (tasks[id].task =
			this.state.text === ""
				? tasks[id].task + this.state.text
				: this.state.text);
		var date = (tasks[id].date =
			d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
		this.props.updateTaskList(tasks);
		this.updateTask(updatedKey, task, date);
	}

	updateTask(key, task, date) {
		var tasks = firebase.database().ref(`Tasks/${this.state.userID}/`);
		tasks
			.child(key)
			.update({ task: task, date: date })
			.then(function() {
				console.log("Update succeeded.");
			})
			.catch(function(error) {
				console.log("Update failed: " + error.message);
			});
	}

	change = ts => {
		this.props.updateTaskList(ts, this.state.checked);
	};

	// Pressing 'Delete' button removes a selected task. Update state and call delTask.
	deleteTask(id) {
		var tasks = [...this.props.taskList];
		var removed = tasks.splice(id, 1);
		this.change(tasks);
		var removedKey = removed[0].key;
		if (removedKey !== undefined) {
			this.removeTask(removedKey);
		}
		// var tasks = [...this.props.taskList];
		// tasks = tasks.filter(task => key != task.key);
		// this.change(tasks);
		// this.removeTask(key);
	}

	// Remove task from database according to the key kept in the state.
	removeTask(key) {
		var tasks = firebase.database().ref(`Tasks/${this.state.userID}/`);
		tasks
			.child(key)
			.remove()
			.then(function() {
				console.log("Remove succeeded.");
			})
			.catch(function(error) {
				console.log("Remove failed: " + error.message);
			});
	}

	render() {
		const taskText = this.props.val.task;
		return (
			<View
				style={{ flex: 1, justifyContent: "center" }}
				key={this.props.keyval}
			>
				<View style={styles.task}>
					{this.state.edit ? (
						<View
							style={
								Platform.OS === "ios"
									? styles.taskRowIos
									: styles.taskRowAndroid
							}
						>
							<View style={styles.taskPadded}>
								<TextInput
									style={styles.textInput}
									onChangeText={text => this.setState({ text })}
								>
									{taskText}
								</TextInput>
								<MaterialIcons
									style={styles.icon}
									name="done"
									size={24}
									color="black"
									onPress={() => {
										this.editTask(this.props.keyval);
										this.setState({ edit: false });
									}}
								/>
								<AntDesign
									style={styles.icon}
									name="close"
									size={24}
									color="black"
									onPress={() => this.setState({ edit: false })}
								/>
							</View>
							<View
								style={
									Platform.OS === "ios" ? styles.dateIos : styles.dateAndroid
								}
							>
								<Text style={styles.dateText}>{this.props.val.date}</Text>
							</View>
						</View>
					) : (
						<View
							style={
								Platform.OS === "ios"
									? styles.taskRowIos
									: styles.taskRowAndroid
							}
						>
							<View style={styles.task}>
								<CheckBox
									value={this.state.checked}
									checkedColor={"black"}
									style={styles.cb}
									onPress={() =>
										this.setState({ checked: !this.state.checked })
									}
									checked={this.state.checked}
								/>

								<Text
									style={this.state.checked ? styles.checked : styles.taskText}
								>
									{this.props.val.task}
								</Text>
								<AntDesign
									style={styles.icon}
									name="edit"
									size={24}
									color="black"
									onPress={() => this.setState({ edit: true })}
								/>
								<AntDesign
									style={styles.icon}
									name="delete"
									size={24}
									color="black"
									onPress={() => {
										this.deleteTask(this.props.keyval);
										this.setState({ checked: false });
									}}
								/>
							</View>
							<View
								style={
									Platform.OS === "ios" ? styles.dateIos : styles.dateAndroid
								}
							>
								<Text style={styles.dateText}>{this.props.val.date}</Text>
							</View>
						</View>
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	taskRowIos: {
		flex: 1,
		flexDirection: "column",
		borderTopWidth: 0.5
		// width: "100%",
		// flexWrap: "wrap"
	},
	taskRowAndroid: {
		flex: 1,
		flexDirection: "column",
		borderTopWidth: 0.5,
		width: "100%"
	},
	task: {
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: "row",
		width: "100%",
		justifyContent: "center"
	},
	taskPadded: {
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
		paddingLeft: 55,
		flexWrap: "wrap"
	},
	// dateIos: {
	// 	flex: 1,
	// 	position: "relative",
	// },
	dateAndroid: {
		flex: 1,
		paddingLeft: 50
	},
	taskText: {
		fontSize: 18,
		fontWeight: "bold",
		width: 200,
		paddingTop: 15
	},
	dateText: {
		paddingLeft: 15,
		fontSize: 14
	},
	textInput: {
		// paddingLeft: 65,
		width: 200,
		// alignSelf: "baseline",
		padding: 10,
		fontSize: 18,
		borderBottomWidth: 1
	},
	checked: {
		fontSize: 18,
		textDecorationLine: "line-through",
		textDecorationStyle: "solid",
		fontWeight: "bold",
		width: 200,
		paddingTop: 15
	},
	icon: {
		padding: 10,
		alignSelf: "flex-end"
	},
	cb: {
		padding: 0,
		flexDirection: "row",
		alignItems: "center"
	}
});

// position: "relative",
// padding: 20,
// paddingRight: 80,
// borderBottomWidth: 2,
// borderBottomColor: "#ededed"

// position: "relative",
// justifyContent: "center",
// alignItems: "center",
// backgroundColor: "#ff6699",
// padding: 10,
// width: 100

// task1: {
// 	paddingTop: 10,
// 	paddingBottom: 10,
// 	flexDirection: "row",
// 	width: "100%",
// 	justifyContent: "center",
// 	alignContent: "center",
// 	borderTopWidth: 0.5,
// 	borderTopColor: "#ededed"
// },
