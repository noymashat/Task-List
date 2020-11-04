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
			error: ""
		};
	}

	// keep user signed in
	componentDidMount() {
		// this.checkIfLoggedIn();
	}

	checkIfLoggedIn = () => {
		firebase.auth().onAuthStateChanged(
			function(user) {
				if (user) {
					this.props.navigation.navigate("Task List");
				} else {
					this.props.navigation.navigate("Sign In");
				}
			}.bind(this)
		);
	};

	handleEmail = text => {
		this.setState({ email: text });
	};
	handlePassword = text => {
		this.setState({ password: text });
	};

	// When sign in button is pressed: validate details, sign in with user details.
	// If sign in succeeds, navigate to Task List screen
	onSignIn = () => {
		if (this.state.email === "" && this.state.password === "") {
			this.setState({ error: "Insert details to sign in!" });
		} else {
			this.setState({
				isLoading: true
			});
			firebase
				.auth()
				.signInWithEmailAndPassword(this.state.email, this.state.password)
				.then(() => {
					console.log("User logged-in successfully!");
					this.setState({
						isLoading: false,
						email: "",
						password: "",
						error: ""
					});
					this.props.navigation.navigate("Task List");
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
							<Item style={{ ...styles.formItem, margin: 10 }} stackedLabel>
								<Label>Email</Label>
								<Input onChangeText={this.handleEmail} />
							</Item>
							<Item style={styles.formItem} stackedLabel last>
								<Label>Password</Label>
								<Input
									onChangeText={this.handlePassword}
									secureTextEntry={true}
								/>
							</Item>
							{this.state.error === "" ? (
								<Text style={{ fontSize: 14, padding: 10 }}></Text>
							) : (
								<Text style={styles.errorText}>Error: {this.state.error}</Text>
							)}
							<Button style={styles.button} full light onPress={this.onSignIn}>
								<Text style={{ fontSize: 18 }}> SIGN IN </Text>
							</Button>
							<Text style={styles.text}>or</Text>
							<Button
								style={styles.button}
								full
								light
								onPress={() => this.props.navigation.navigate("Sign Up")}
							>
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
	header: {
		backgroundColor: "#ff6699"
	},
	text: {
		textAlign: "center"
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
		borderColor: "rgb(170, 100, 110)",
		borderWidth: 2
	},
	form: {
		width: "90%",
		// height: "45%",
		// flex: 1,
		// paddingTop: 50,
		// justifyContent: "flex-start",
		backgroundColor: "rgba(255, 255, 255, 0.4)",
		borderRadius: 10,
		flex: 1,
		justifyContent: "flex-start"
	},
	formItem: {
		alignSelf: "center",
		width: "90%",
		backgroundColor: "rgba(249, 223, 206, 0.65)",
		borderRadius: 10,
		borderColor: "rgb(170, 100, 110)",
		paddingLeft: 15,
		borderWidth: 2
	}
});
