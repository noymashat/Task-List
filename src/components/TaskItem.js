import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { CheckBox } from "react-native-elements";

export default class TaskItem extends Component {
	constructor() {
		super();
		this.state = {
			checked: false
		};
	}

	render() {
		return (
			<View key={this.props.keyval} style={styles.taskView}>
				<View style={styles.task}>
					<CheckBox
						checked={this.state.checked}
						style={styles.cb}
						onPress={() => this.setState({ checked: !this.state.checked })}
					/>
					<Text style={this.state.checked ? styles.checked : styles.taskText}>
						{this.props.val.task}
					</Text>
					<Text style={styles.dateText}>{this.props.val.date}</Text>
					<TouchableOpacity
						onPress={this.props.deleteMethod}
						style={styles.taskDelete}
					>
						<Text style={styles.taskDeletedText}>Delete</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	task: {
		position: "relative",
		padding: 20,
		paddingRight: 80,
		borderBottomWidth: 2,
		borderBottomColor: "#ededed"
	},
	taskText: {
		paddingLeft: 30,
		fontSize: 18,
		fontWeight: "bold",
		width: 300
	},
	dateText: {
		paddingLeft: 30,
		fontSize: 18
	},
	checked: {
		paddingLeft: 30,
		fontSize: 18,
		textDecorationLine: "line-through",
		textDecorationStyle: "solid",
		fontWeight: "bold",
		width: 300
	},
	taskDelete: {
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ff6699",
		padding: 10,
		width: 100
	},
	taskDeletedText: {
		color: "white"
	},
	cb: {
		flexDirection: "row",
		alignItems: "center"
	}
});

// <View key={this.props.keyval} style={styles.task}>
// 	<Text style={styles.taskText}>{this.props.val.date}</Text>
// 	<Text style={styles.taskText}>{this.props.val.task}</Text>
// 	<View>
// 		<TouchableOpacity
// 			onPress={this.props.deleteMethod}
// 			style={styles.taskDelete}
// 		>
// 			<Text style={styles.taskDeletedText}>Delete</Text>
// 		</TouchableOpacity>
// 	</View>
// </View>
