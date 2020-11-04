import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import { Form, Item, Input, Button, Label } from "native-base";
import firebase from "../../database/firebase";
import BG from "../../assets/BG.jpeg";

export default class SignInScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			email: "",
			password: "",
			confPassword: "",
			firstName: "",
			lastName: "",
			error: ""
		};
	}

	handleEmail = text => {
		this.setState({ email: text });
	};
	handlePassword = text => {
		this.setState({ password: text });
	};
	handleConfPassword = text => {
		this.setState({ confPassword: text });
	};
	handleFirstName = text => {
		this.setState({ firstName: text });
	};
	handleLastName = text => {
		this.setState({ lastName: text });
	};
	// When sign up button is pressed: validate details, create new user in the database
	// If sign up succeeds, navigate back to Sign In screen
	onSignUp = () => {
		if (
			this.state.firstName === "" ||
			this.state.lastName === "" ||
			this.state.email === "" ||
			this.state.password === ""
		) {
			this.setState({ error: "All fields are required" });
		}
		if (this.state.password !== this.state.confPassword) {
			this.setState({ error: "Password do not match.\nPlease try again" });
		} else {
			this.setState({
				isLoading: true
			});
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then(res => {
					console.log("User registered successfully!");
					this.setState({
						isLoading: false,
						email: "",
						password: "",
						confPassword: "",
						firstName: "",
						lastName: ""
					});
					this.props.navigation.navigate("Sign In");
					alert("User signed up successfully!\nPlease sign in");
				})
				.catch(err => {
					var e = err.code.slice(5);
					e = e.replace("-", " ");
					this.setState({ error: e });
				});
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground style={styles.image} source={BG}>
					<View style={styles.view1}>
						<Form style={styles.form}>
							<Item style={styles.formItem} stackedLabel>
								<Label>First Name</Label>
								<Input onChangeText={this.handleFirstName} />
							</Item>
							<Item style={styles.formItem} stackedLabel>
								<Label>Last Name</Label>
								<Input onChangeText={this.handleLastName} />
							</Item>
							<Item style={styles.formItem} stackedLabel>
								<Label>Email</Label>
								<Input onChangeText={this.handleEmail} />
							</Item>
							<Item style={styles.formItem} stackedLabel>
								<Label>Password</Label>
								<Input
									onChangeText={this.handlePassword}
									secureTextEntry={true}
								/>
							</Item>
							<Item style={styles.formItemLast} stackedLabel last>
								<Label>Confirm Password</Label>
								<Input
									onChangeText={this.handleConfPassword}
									secureTextEntry={true}
								/>
							</Item>
							{this.state.error === "" ? (
								<Text style={{ fontSize: 14, padding: 10 }}></Text>
							) : (
								<Text style={styles.errorText}>Error: {this.state.error}</Text>
							)}
							<Button style={styles.button} full light onPress={this.onSignUp}>
								<Text style={{ fontSize: 18 }}> SIGN UP </Text>
							</Button>
						</Form>
						<View style={{ flex: 1.4 }}></View>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	view1: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		backgroundColor: "rgba(255, 255, 255, 0.3)"
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white"
	},
	image: {
		height: "100%",
		width: "100%"
		// opacity: 0.8
	},
	errorText: {
		textAlign: "center",
		color: "rgb(170, 100, 110)",
		fontSize: 16,
		fontWeight: "bold",
		padding: 10
	},
	button: {
		alignSelf: "center",
		width: "50%",
		backgroundColor: "rgba(249, 223, 206, 0.65)",
		borderRadius: 20,
		borderColor: "#fff",
		borderWidth: 2
	},
	form: {
		width: "90%",
		height: "70%",
		// flex: 1,
		// paddingTop: 50,
		// justifyContent: "flex-start",
		backgroundColor: "rgba(255, 255, 255, 0.4)",
		borderRadius: 10,
		// flex: 1,
		justifyContent: "flex-start"
	},
	formItem: {
		alignSelf: "center",
		width: "90%",
		backgroundColor: "rgba(249, 223, 206, 0.65)",
		borderRadius: 10,
		borderColor: "rgb(170, 100, 110)",
		paddingLeft: 15,
		borderWidth: 2,
		margin: 10
	},
	formItemLast: {
		alignSelf: "center",
		width: "90%",
		backgroundColor: "rgba(249, 223, 206, 0.65)",
		borderRadius: 10,
		borderColor: "rgb(170, 100, 110)",
		paddingLeft: 15,
		borderWidth: 2,
		marginTop: 10
	}
});
