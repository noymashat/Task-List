import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	SafeAreaView,
	Platform
} from "react-native";
import TaskItem from "../components/TaskItem";
import firebase from "../../database/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { Container } from "native-base";

<script src="http://10.100.102.201:8097"></script>;

export default class TaskListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskList: [],
			taskText: "",
			editText: "",
			userID: firebase.auth().currentUser.uid // get userID from firebase
		};
		this.updateTaskList = this.updateTaskList.bind(this);
	}

	// After mount, read all user's tasks and update the component's taskList.
	// once: Listens for exactly one event of the specified event type ("value": triggers every time the data changes),
	// retrieves the snapshot of the data and then stops listening.
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

	// Push task to user's task list in the database
	pushTask(task, date) {
		if (this.state.taskText) {
			var d = new Date();
			var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
			var task = this.state.taskText;
			firebase
				.database()
				.ref(`Tasks/${this.state.userID}/`)
				.push({
					task,
					date
				})
				.then(res => {
					this.addTask(res.key, date, task);
					console.log("Task was added to database");
				})
				.catch(error => {
					console.log("error ", error);
				});
		}
	}

	// Pressing '+' button adds a new task. Update state with new values and call push task.
	addTask(key, date, task) {
		this.state.taskList.push({
			key,
			date,
			task
		});
		this.setState({ taskList: this.state.taskList });
		this.setState({ taskText: "" });
	}

	updateTaskList = tasks => {
		const task = tasks;
		this.setState({ taskList: task });
	};

	render() {
		let tasks = this.state.taskList.map(val => {
			return (
				<TaskItem
					key={val.key}
					keyval={val.key}
					val={val}
					taskList={this.state.taskList}
					updateTaskList={this.updateTaskList}
				/>
			);
		});
		// console.log(tasks);
		return (
			<Container>
				{Platform.OS === "ios" ? (
					<KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
						<View style={styles.container}>
							<ScrollView
								style={styles.scrollViewIos}
								keyboardShouldPersistTaps="handled"
							>
								<View style={styles.containerIos}>
									<View>
										<Text>{tasks}</Text>
									</View>
									<View style={styles.containerIos}>
										<TextInput
											style={styles.textInputIos}
											onChangeText={taskText => this.setState({ taskText })}
											value={this.state.taskText}
											placeholder="New Task"
											onSubmitEditing={this.pushTask.bind(this)}
										></TextInput>

										<MaterialIcons
											name="add"
											size={24}
											color="black"
											onPress={this.pushTask.bind(this)}
											style={styles.addButton}
										/>
									</View>
								</View>
							</ScrollView>
						</View>
					</KeyboardAvoidingView>
				) : (
					<KeyboardAvoidingView
						behavior={undefined}
						enabled
						style={{ flex: 1 }}
					>
						<View style={styles.container}>
							<ScrollView
								style={styles.scrollViewAndroid}
								keyboardShouldPersistTaps="handled"
							>
								{tasks}
								<View style={styles.containerAndroid}>
									<View>
										<Text>{tasks}</Text>
									</View>
									<View style={styles.containerAndroid}>
										<TextInput
											style={styles.textInputAndroid}
											onChangeText={taskText => this.setState({ taskText })}
											value={this.state.taskText}
											placeholder="New Task"
											onSubmitEditing={this.pushTask.bind(this)}
										></TextInput>

										<MaterialIcons
											name="add"
											size={24}
											color="black"
											onPress={this.pushTask.bind(this)}
											style={styles.addButton}
										/>
									</View>
								</View>
							</ScrollView>
						</View>
					</KeyboardAvoidingView>
				)}
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	// scrollViewIos: {
	// 	flex: 1,
	// 	flexDirection: "column",
	// 	flexWrap: "wrap-reverse",
	// 	position: "absolute"
	// 	// paddingLeft: 60
	// },
	scrollViewAndroid: {
		// flexDirection: "column",
		marginHorizontal: 20
	},
	// containerIos: {
	// 	// flex: 1,
	// 	// flexDirection: "column"
	// },
	containerAndroid: {
		flex: 1
		// flexDirection: "column"
	},
	textInputIos: {
		// position: "absolute",
		// justifyContent: "space-evenly",
		// alignSelf: "stretch",
		padding: 20,
		borderTopWidth: 2,
		borderTopColor: "#ededed",
		fontSize: 18,
		height: 60
	},
	textInputAndroid: {
		// position: "absolute",
		justifyContent: "space-evenly",
		alignSelf: "stretch",
		padding: 20,
		borderTopWidth: 2,
		borderTopColor: "#ededed",
		fontSize: 18,
		height: 60
	},
	addButton: {
		position: "absolute",
		zIndex: 11,
		right: 5,
		bottom: 23
	}
});
