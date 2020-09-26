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
			password: ""
		};
	}
	// componentDidMount() {
	// 	this.checkIfLoggedIn();
	// }

	// checkIfLoggedIn = () => {
	// 	firebase.auth().onAuthStateChanged(
	// 		function(user) {
	// 			if (user) {
	// 				this.props.navigation.navigate("Task List");
	// 			} else {
	// 				this.props.navigation.navigate("Sign In");
	// 			}
	// 		}.bind(this)
	// 	);
	// };

	handleEmail = text => {
		this.setState({ email: text });
	};
	handlePassword = text => {
		this.setState({ password: text });
	};

	onSignIn = () => {
		if (this.state.email === "" && this.state.password === "") {
			alert("Enter details to sign in!");
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
				.catch(error => alert(error.message));
		}
	};

	onSignUp = () => {
		if (this.state.email === "" && this.state.password === "") {
			alert("Enter details to sign up!");
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
						password: ""
					});
					this.props.navigation.navigate("Sign In");
					alert("User signed up successfully!\n Please sign in");
				})
				.catch(error => alert(error.message));
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
						<Button full light onPress={this.onSignIn}>
							<Text> SIGN IN </Text>
						</Button>
						<Text style={styles.text}>or</Text>
						<Button full light onPress={this.onSignUp}>
							<Text> SIGN UP </Text>
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
	}
});
