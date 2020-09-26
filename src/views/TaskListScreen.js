import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
	Footer
} from "react-native";
import { Header } from "native-base";
import TaskItem from "../components/TaskItem";
import firebase from "../../database/firebase";
import { bold } from "ansi-colors";

export default class TaskListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskList: [],
			taskText: "",
			userID: firebase.auth().currentUser.uid
		};
	}

	componentDidMount() {
		var tasks = [];
		firebase
			.database()
			.ref(`Tasks/${this.state.userID}/`)
			.once("value", snapshot => {
				snapshot.forEach(function(childSnapshot) {
					var childKey = childSnapshot.key;
					var childData = childSnapshot.val();
					tasks.push({
						key: childKey,
						date: childData.date,
						task: childData.task
					});
				});
				this.setState({ taskList: tasks });
			});
	}

	addTask() {
		if (this.state.taskText) {
			var d = new Date();
			var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
			var task = this.state.taskText;
			this.state.taskList.push({
				date,
				task
			});
			this.setState({ taskList: this.state.taskList });
			this.setState({ taskText: "" });
			this.pushTask(task, date);
		}
	}

	pushTask(task, date) {
		firebase
			.database()
			.ref(`Tasks/${this.state.userID}/`)
			.push({
				task,
				date
			})
			.then(res => {
				console.log("Task was written to database!");
			})
			.catch(error => {
				console.log("error ", error);
			});
	}

	deleteTask(id) {
		var removed = this.state.taskList.splice(id, 1);
		var removedKey = removed[0]["key"];
		this.setState({ taskList: this.state.taskList });
		if (removedKey !== undefined) {
			this.delTask(removedKey);
		}
	}

	delTask(key) {
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
		let tasks = this.state.taskList.map((val, key) => {
			return (
				<TaskItem
					key={key}
					keyval={key}
					val={val}
					deleteMethod={() => this.deleteTask(key)}
				/>
			);
		});
		return (
			<View style={styles.container}>
				<ScrollView>
					<Text>{tasks}</Text>
					<TextInput
						style={styles.textInput}
						onChangeText={taskText => this.setState({ taskText })}
						value={this.state.taskText}
						placeholder="New Task"
					></TextInput>
				</ScrollView>
				<View>
					<TouchableOpacity
						onPress={this.addTask.bind(this)}
						style={styles.addButton}
					>
						<Text style={styles.addButtonText}>+</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	scrollView: {
		marginHorizontal: 20
	},
	header: {
		backgroundColor: "#ff6699"
	},
	headerText: {
		fontSize: 38,
		fontWeight: "bold"
	},
	scrollContainer: {
		flex: 1,
		marginBottom: 100
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 50
	},
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 10
	},
	textInput: {
		alignSelf: "stretch",
		padding: 20,
		borderTopWidth: 2,
		borderTopColor: "#ededed"
	},
	addButton: {
		position: "absolute",
		zIndex: 11,
		right: 20,
		bottom: 10,
		backgroundColor: "#ff6699",
		width: 70,
		height: 70,
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
		elevation: 8
	},
	addButtonText: {
		fontSize: 24
	}
});
