import React from "react";
import { Button, Form } from "react-bootstrap";
import useValidated from "../../hooks/useValidated";
import useRegistered from "../../hooks/useRegistered";

const SignUp = ({
	handleFormSubmit,
	handleEmailBlur,
	handlePasswordBlur,
	handleSignupCheck,
	handlePasswordReset,
}) => {
	const [validated, setValidated] = useValidated();
	const [registered, setRegistered] = useRegistered();
	return (
		<div className="w-50 mx-auto mt-3">
			<Form noValidate validated={validated} onSubmit={handleFormSubmit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
					<Form.Control.Feedback type="invalid">Please provide a valid Email</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						onBlur={handlePasswordBlur}
						type="password"
						placeholder="Password"
						required
					/>
					<Form.Control.Feedback type="invalid">
						Please provide a valid Password
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check onChange={handleSignupCheck} type="checkbox" label="Already SignedUp?" />
				</Form.Group>
				<Button onClick={handlePasswordReset} variant="link">
					Forgot Password?
				</Button>
				<Button variant="primary" type="submit">
					{registered ? "SignIn" : "SignUp"}
				</Button>
			</Form>
		</div>
	);
};

export default SignUp;
