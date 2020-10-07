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
			<Container style={styles.container}>
				<Content>
					<Form>
						<Item stackedLabel>
							<Label>First Name</Label>
							<Input onChangeText={this.handleFirstName} />
						</Item>
						<Item stackedLabel>
							<Label>Last Name</Label>
							<Input onChangeText={this.handleLastName} />
						</Item>
						<Item stackedLabel>
							<Label>Email</Label>
							<Input onChangeText={this.handleEmail} />
						</Item>
						<Item stackedLabel>
							<Label>Password</Label>
							<Input
								onChangeText={this.handlePassword}
								secureTextEntry={true}
							/>
						</Item>
						<Item stackedLabel last>
							<Label>Confirm Password</Label>
							<Input
								onChangeText={this.handleConfPassword}
								secureTextEntry={true}
							/>
						</Item>
						{this.state.error === "" ? (
							<Text style={{ fontSize: 14, padding: 10 }}></Text>
						) : (
							<Text
								style={{
									textAlign: "center",
									color: "#FF0000",
									fontSize: 14,
									padding: 10
								}}
							>
								Error: {this.state.error}
							</Text>
						)}
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
