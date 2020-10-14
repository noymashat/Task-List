import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TaskContainer from "./TaskContainer";

export const TaskList = props => {
	const styles = Platform.OS === "ios" ? stylesIos : stylesAndroid;
	let tasks = props.taskList.map((val, key) => {
		return (
			<TaskContainer
				key={val.key}
				keyval={val.key}
				val={val}
				taskList={props.taskList}
				changeTaskList={props.changeTaskList}
				checked={val.checked}
			/>
		);
	});
	return (
		<View>
			<Text>{tasks}</Text>
		</View>
	);
};

const stylesAndroid = StyleSheet.create({});

const stylesIos = StyleSheet.create({});
