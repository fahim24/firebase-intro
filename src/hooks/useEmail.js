import { useState } from "react";

const useEmail = () => {
	const [email, setEmail] = useState("");

	return [email, setEmail];
};

export default useEmail;
