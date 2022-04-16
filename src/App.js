import "./App.css";
import app from "./firebase.init";
import {
	createUserWithEmailAndPassword,
	getAuth,
	GithubAuthProvider,
	GoogleAuthProvider,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp/SignUp";
import { Button } from "react-bootstrap";
import useEmail from "./hooks/useEmail";
import usePassword from "./hooks/usePassword";
import useValidated from "./hooks/useValidated";
import useRegistered from "./hooks/useRegistered";

const auth = getAuth(app);

function App() {
	const [user, setUser] = useState({});
	const [email, setEmail] = useEmail();
	const [password, setPassword] = usePassword();
	const [validated, setValidated] = useValidated();
	const [registered, setRegistered] = useRegistered();

	const googleProvider = new GoogleAuthProvider();
	const githubProvider = new GithubAuthProvider();

	const handleGoogleSignIn = () => {
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				const user = result.user;
				setUser(user);
				console.log(user);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleGithubSignIn = () => {
		signInWithPopup(auth, githubProvider)
			.then((result) => {
				const user = result.user;
				setUser(user);
				console.log(user);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				setUser({});
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleEmailBlur = (event) => {
		setEmail(event.target.value);
		console.log(event.target.value);
	};

	const handlePasswordBlur = (event) => {
		setPassword(event.target.value);
		console.log(event.target.value);
	};

	const handleSignupCheck = (event) => {
		setRegistered(event.target.checked);
	};

	const handleFormSubmit = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		if (form.checkValidity() === false) {
			event.stopPropagation();
			return;
		}

		setValidated(true);

		if (registered) {
			signInWithEmailAndPassword(auth, email, password)
				.then((result) => {
					const user = result.user;
					setUser(user);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			createUserWithEmailAndPassword(auth, email, password)
				.then((result) => {
					const user = result.user;
					console.log(user);
					handleVerifyEmail();
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const handlePasswordReset = () => {
		sendPasswordResetEmail(auth, email)
			.then(() => {})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleVerifyEmail = () => {
		sendEmailVerification(auth.currentUser).then(() => {});
	};

	return (
		<div>
			{user.uid ? (
				""
			) : (
				<SignUp
					handleFormSubmit={handleFormSubmit}
					handleEmailBlur={handleEmailBlur}
					handlePasswordBlur={handlePasswordBlur}
					handleSignupCheck={handleSignupCheck}
					handlePasswordReset={handlePasswordReset}
				></SignUp>
			)}
			{user.uid ? (
				<Button onClick={handleSignOut} variant="danger">
					SignOut
				</Button>
			) : (
				<div>
					<Button onClick={handleGoogleSignIn} variant="primary">
						Google SignIn
					</Button>
					<Button onClick={handleGithubSignIn} variant="primary">
						GitHub SignIn
					</Button>
				</div>
			)}
			<br />
			<img src={user.photoURL} alt="" />
			<h2>Name: {user.displayName}</h2>
			<p>E-Mail: {user.email}</p>
		</div>
	);
}

export default App;
