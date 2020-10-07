import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
// import firebase from "firebase";
import {
	Container,
	Content,
	Form,
	Item,
	Input,
	Button,
	Label
} from "native-base";
import firebase from "../../database/firebase";

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
		this.checkIfLoggedIn();
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
				.then(res => {
					console.log("User logged-in successfully!");
					this.setState({
						isLoading: false,
						email: "",
						password: ""
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
			<Container style={styles.container}>
				<Content>
					<Form>
						<Item stackedLabel>
							<Label>Email</Label>
							<Input onChangeText={this.handleEmail} />
						</Item>
						<Item stackedLabel last>
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
						<Button full light onPress={this.onSignIn}>
							<Text style={{ fontSize: 18 }}> SIGN IN </Text>
						</Button>
						<Text style={styles.text}>or</Text>
						<Button
							full
							light
							onPress={() => this.props.navigation.navigate("Sign Up")}
						>
							<Text style={{ fontSize: 18 }}> SIGN UP </Text>
						</Button>
					</Form>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		justifyContent: "center"
	},
	header: {
		backgroundColor: "#ff6699"
	},
	text: {
		textAlign: "center"
	},
	errorText: {
		textAlign: "center",
		color: "#FF0000",
		fontSize: 14,
		padding: 10
	}
});
