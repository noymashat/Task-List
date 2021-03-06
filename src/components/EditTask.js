import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export const EditTask = props => {
	const d = props.val.date;
	const [date, setDate] = useState(new Date(d));
	const [text, setText] = useState("");

	// Pressing 'Edit' button changes the name of the selected task. Update taskList and call updateTask.
	const editTask = id => {
		var tasks = [...props.taskList];
		// var d = new Date();
		var newDate = date;
		// d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
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

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};

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
						editTask(props.val.key);
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
				<DateTimePicker
					value={date}
					mode={"date"}
					is24Hour={true}
					display="default"
					onChange={onChange}
				/>
				<Text style={styles.dateText}>
					{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	view1: {
		flex: 1,
		width: "100%"
	},
	view2: {
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
		paddingLeft: 45,
		flexWrap: "wrap"
	},
	textInput: {
		width: 180,
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
		paddingLeft: 50,
		paddingBottom: 10
	},
	dateText: {
		paddingLeft: 15,
		fontSize: 14
	}
});
