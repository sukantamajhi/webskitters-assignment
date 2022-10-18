import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const Signup = dynamic(() => import("../components/SignUp"), {
	suspense: true,
});

const signup = () => {
	return (
		<>
			<Suspense fallback={`Loading...`}>
				<Signup />
			</Suspense>
		</>
	);
};

export default signup;
