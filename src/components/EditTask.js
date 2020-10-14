import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export const EditTask = props => {
	const [text, setText] = useState("");

	const editTask = id => {
		console.log("edit");
		var tasks = [...props.taskList];
		console.log(tasks);
		var d = new Date();
		var newDate =
			d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
		let task = tasks.find((taskObj, i) => {
			if (taskObj.key === id) {
				tasks[i].task = text === "" ? taskObj.task + text : text;
				tasks[i].date = newDate;
				return taskObj; // stop searching
			}
		});
		props.changeTaskList(tasks);
		props.updateTask(task.key, task.task, task.date, task.checked);
	};

	const styles = Platform.OS === "ios" ? stylesIos : stylesAndroid;

	return (
		<View style={styles.view1}>
			<View style={styles.view2}>
				<TextInput
					style={styles.textInput}
					onChangeText={text => setText(text)}
				>
					{props.val.task}
				</TextInput>
				<MaterialIcons
					style={styles.icon}
					name="done"
					size={24}
					color="black"
					onPress={() => {
						editTask(props.keyval);
						props.changeEdit(false);
					}}
				/>
				<AntDesign
					style={styles.icon}
					name="close"
					size={24}
					color="black"
					onPress={() => props.changeEdit(false)}
				/>
			</View>
			<View style={styles.date}>
				<Text style={styles.dateText}>{props.val.date}</Text>
			</View>
		</View>
	);
};

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
		width: "100%",
		justifyContent: "center",
		paddingLeft: 55,
		flexWrap: "wrap"
	},
	textInput: {
		// paddingLeft: 65,
		width: 200,
		padding: 10,
		fontSize: 18,
		borderBottomWidth: 1
	},
	icon: {
		padding: 10,
		alignSelf: "flex-end"
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
		width: "100%",
		justifyContent: "center",
		paddingLeft: 55,
		flexWrap: "wrap"
	},
	textInput: {
		// paddingLeft: 65,
		width: 200,
		padding: 10,
		fontSize: 18,
		borderBottomWidth: 1
	},
	icon: {
		padding: 10,
		alignSelf: "flex-end"
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
