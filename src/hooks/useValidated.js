import { useState } from "react";

const useValidated = () => {
	const [validated, setValidated] = useState(false);

	return [validated, setValidated];
};

export default useValidated;
