import React, { Component } from "react";
import {
	StyleSheet,
	View,
	ImageBackground,
	Text,
	ScrollView,
	KeyboardAvoidingView
} from "react-native";
import { Form, Item, Input, Button, Label } from "native-base";
import firebase from "../../database/firebase";
import BG from "../../assets/BG.png";
import Colors from "../../colors";

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
			<ImageBackground style={styles.image} source={BG}>
				<View style={styles.view2}>
					<KeyboardAvoidingView
						behavior={Platform.OS == "ios" ? "padding" : "height"}
						keyboardVerticalOffset={Platform.OS === "ios" ? 150 : undefined}
						style={{ width: "100%" }}
					>
						<ScrollView keyboardShouldPersistTaps="always">
							<View style={{ alignItems: "center" }}>
								<Form style={styles.form}>
									<Item
										style={{
											...styles.formItem,
											margin: 15,
										}}
										stackedLabel
									>
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
										<Text style={styles.errorText}>
											Error: {this.state.error}
										</Text>
									)}
									<Button
										style={styles.button}
										full
										light
										onPress={this.onSignIn}
									>
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
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	view1: {},
	image: {
		height: "100%",
		width: "100%"
		// opacity: 0.9
	},
	view2: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		position: "relative"
		// marginTop: Platform.OS === "ios" ? undefined : 75
	},
	form: {
		width: "90%",
		height: "47%",
		backgroundColor: Colors.light.formBackground,
		borderRadius: 10
	},
	formItem: {
		alignSelf: "center",
		width: "90%",
		backgroundColor: Colors.light.itemNoOpacity,
		borderRadius: 10,
		borderColor: Colors.light.borderColor,
		paddingLeft: 15,
		borderBottomWidth: 2
	},
	button: {
		alignSelf: "center",
		width: "50%",
		backgroundColor: Colors.light.itemNoOpacity,
		borderRadius: 20,
		borderColor: Colors.light.borderColor,
		borderWidth: 2
	},
	text: {
		textAlign: "center"
	},
	errorText: {
		textAlign: "center",
		color: Colors.light.borderColor,
		fontSize: 16,
		fontWeight: "bold",
		padding: 10
	}
});
