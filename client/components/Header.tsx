import React from "react";
import { getLocalStorage } from "api-config";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
	const router = useRouter();
	const handleBtnClick = () => {
		if (getLocalStorage("user")) {
			localStorage.clear();
			router.push("/login");
		} else {
			router.push("/login");
		}
	};
	return (
		<div>
			<header className="text-gray-600 body-font">
				<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
					<a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
							viewBox="0 0 24 24">
							<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
						</svg>
						<span className="ml-3 text-xl">
							Webskitters Assignment
						</span>
					</a>
					<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
						{/* <Link href={`/products`} passHref>
							<a className="mr-5 hover:text-gray-900">Products</a>
						</Link> */}
						{getLocalStorage("user")?._id && (
							<button
								// onClick={handleBtnClick}
								className={`mr-5 inline-flex items-center border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0 bg-blue-600 text-white`}>
								Add Product
							</button>
						)}
					</nav>
					<button
						onClick={handleBtnClick}
						className={`inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ${
							getLocalStorage("user")
								? `bg-red-600 text-white`
								: `bg-gray-100`
						}`}>
						{getLocalStorage("user") ? "Logout" : `Login`}
					</button>
				</div>
			</header>
		</div>
	);
};

export default Header;
