import { useState } from "react";

const useRegistered = () => {
	const [registered, setRegistered] = useState(false);

	return [registered, setRegistered];
};

export default useRegistered;
