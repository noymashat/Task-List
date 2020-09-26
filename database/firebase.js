import * as firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCFLyQEceyy_lJESFsddqvz1MCZ0CVgiJU",
	authDomain: "todo-list-noy.firebaseapp.com",
	databaseURL: "https://todo-list-noy.firebaseio.com",
	projectId: "todo-list-noy",
	storageBucket: "todo-list-noy.appspot.com"
};

if (!firebase.apps.length) {
	let firebaseApp = firebase.initializeApp(firebaseConfig);
}

export default firebase;
