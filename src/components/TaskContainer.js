import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { CheckBox } from "react-native-elements";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import firebase from "../../database/firebase";
import { Container } from "native-base";
import { EditTask } from "./EditTask";
import { TaskItem } from "./TaskItem";

<script src="http://10.100.102.201:8097"></script>;

export default class TaskContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			userID: firebase.auth().currentUser.uid // get userID from firebase
		};
		this.changeEdit.bind(this);
	}

	updateTask(key, task, date, checked) {
		var tasks = firebase.database().ref(`Tasks/${this.state.userID}/`);
		tasks
			.child(key)
			.update({ task: task, date: date, checked: checked })
			.then(function() {
				console.log("Update succeeded.");
			})
			.catch(function(error) {
				console.log("Update failed: " + error.message);
			});
	}

	changeEdit = bool => {
		const edit = bool;
		this.setState({ edit });
	};

	render() {
		const styles = Platform.OS === "ios" ? stylesIos : stylesAndroid;
		return (
			<Container style={styles.container}>
				<View style={styles.view1} key={this.props.keyval}>
					<View style={styles.view2}>
						{this.state.edit ? (
							<EditTask
								val={this.props.val}
								keyval={this.props.keyval}
								taskList={this.props.taskList}
								changeEdit={this.changeEdit}
								changeTaskList={this.props.changeTaskList}
								updateTask={this.updateTask.bind(this)}
								styles={styles}
							/>
						) : (
							<TaskItem
								val={this.props.val}
								keyval={this.props.keyval}
								taskList={this.props.taskList}
								checked={this.props.checked}
								updateTask={this.updateTask.bind(this)}
								changeTaskList={this.props.changeTaskList}
								changeEdit={this.changeEdit}
								styles={styles}
							/>
						)}
					</View>
				</View>
			</Container>
		);
	}
}
const stylesIos = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
		position: "absolute",
		flexWrap: "wrap",
		width: "100%",
		height: "100%"
	},
	view1: {},
	view2: {
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		justifyContent: "center"
	}
});

const stylesAndroid = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
		position: "absolute",
		flexWrap: "wrap",
		width: "100%",
		height: "100%"
	},
	view1: { flex: 1, justifyContent: "center" },
	view2: {
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		justifyContent: "center"
	}
});
