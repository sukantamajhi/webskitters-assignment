import React, { useEffect, useState } from "react";
import { doPostApiCall } from "api-config";
import { useRouter } from "next/router";

const Login = () => {
	const router = useRouter();
	const [disabled, setDisabled] = useState(true);
	const [userData, setUserData] = useState({ email: "", password: "" });
	const handleChange = (e: any) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (!userData.email || !userData.password) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [userData]);

	const handleLogin = async () => {
		let url = `${process.env.NEXT_PUBLIC_API_URL}/users/login`;
		let bodyData = {
			email: userData.email,
			password: userData.password,
		};
		const data: any = await doPostApiCall({
			url: `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
			bodyData: {
				email: userData.email,
				password: userData.password,
			},
		});
		if (data.result?._id) {
			localStorage.setItem("user", JSON.stringify(data.result));
			router.push("/");
		}
	};
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="w-2/5 h-fit pb-4 rounded-2xl shadow-2xl">
				<div className="flex flex-col justify-center items-center w-full mt-4">
					<h1 className="font-semibold text-2xl">Sign In</h1>
					<div className="relative mb-4 flex flex-col w-full px-4">
						<label
							htmlFor="email"
							className="leading-7 text-sm text-gray-600">
							Email
						</label>
						<input
							onChange={handleChange}
							type="email"
							id="email"
							name="email"
							placeholder="Enter your email address"
							className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
					</div>
					<div className="relative mb-4 flex flex-col w-full px-4">
						<label
							htmlFor="email"
							className="leading-7 text-sm text-gray-600">
							Password
						</label>
						<input
							onChange={handleChange}
							type="password"
							id="password"
							name="password"
							placeholder="Enter your password"
							className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
					</div>
					<div className="relative mb-4 flex flex-col w-full px-4 mt-4">
						<button
							disabled={disabled}
							onClick={handleLogin}
							className={`py-2 px-3 rounded-md text-white ${
								disabled
									? `bg-gray-400`
									: `bg-blue-500 cursor-pointer`
							}`}>
							Login
						</button>
					</div>
					<div className="relative mb-4 flex flex-col w-full px-4 mt-4">
						<p>
							Don't have account?{" "}
							<span
								className="cursor-pointer text-blue-600"
								onClick={() => router.push("/signup")}>
								Signup
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
