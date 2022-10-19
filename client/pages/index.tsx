import { getLocalStorage } from "api-config";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Login from "../components/Login";
import Productlist from "../components/Productlist";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{getLocalStorage("user")?._id ? <Productlist /> : <Login />}
		</div>
	);
};

export default Home;
