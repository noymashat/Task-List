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
import TaskContainer from "../components/TaskContainer";
import firebase from "../../database/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { Container } from "native-base";
import { TaskList } from "../components/TaskList";
import AddTask from "../components/AddTask";
import { pink } from "color-name";

<script src="http://10.100.102.201:8097"></script>;

export default class TaskListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskList: [],
			taskText: "",
			userID: firebase.auth().currentUser.uid // get userID from firebase
		};
		this.changeTaskList = this.changeTaskList.bind(this);
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
						task: childData.task,
						checked: childData.checked
					});
				});
				this.setState({ taskList: tasks });
			});
	}

	componentWillUnmount() {
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
						task: childData.task,
						checked: childData.checked
					});
				});
				this.setState({ taskList: tasks });
			});
	}

	// update list from taskItem
	changeTaskList = tasks => {
		const task = tasks;
		this.setState({ taskList: task });
	};

	render() {
		const styles = Platform.OS === "ios" ? stylesIos : stylesAndroid;
		return (
			<Container>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : { undefined }}
					enabled
					style={styles.keyboardAvoidingView}
				>
					<View style={styles.view1}>
						<ScrollView
							keyboardShouldPersistTaps="handled"
							style={styles.scrollView}
						>
							<View style={styles.view2}>
								<TaskList
									taskList={this.state.taskList}
									changeTaskList={this.changeTaskList}
									styles={styles}
								/>
								<AddTask
									changeTaskList={this.changeTaskList}
									taskList={this.state.taskList}
									styles={styles}
								/>
							</View>
						</ScrollView>
					</View>
				</KeyboardAvoidingView>
			</Container>
		);
	}
}

const stylesAndroid = StyleSheet.create({
	keyboardAvoidingView: {
		flex: 1
	},
	view1: {
		flex: 1,
		justifyContent: "center"
	},
	scrollView: {
		marginHorizontal: 20
	},
	view2: {
		flex: 1
	},
	textInput: {
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

const stylesIos = StyleSheet.create({
	keyboardAvoidingView: {
		flex: 1
	},
	view1: {
		flex: 1,
		justifyContent: "center"
	},
	scrollView: {
		marginHorizontal: 20
	},
	view2: {
		position: "relative",
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#ededed"
	},
	textInput: {
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
