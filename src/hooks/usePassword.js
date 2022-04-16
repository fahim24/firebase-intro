import { useState } from "react";

const usePassword = () => {
	const [password, setPassword] = useState("");

	return [password, setPassword];
};

export default usePassword;
