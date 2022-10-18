import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const Login = dynamic(() => import("../components/Login"), { suspense: true });

const login = () => {
	return (
		<>
			<Suspense fallback={`Loading...`}>
				<Login />
			</Suspense>
		</>
	);
};

export default login;
