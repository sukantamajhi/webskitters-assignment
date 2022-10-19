import { doPostApiCall, doPutApiCall } from "api-config";
import React, { useState } from "react";

const AddProduct = (props: any) => {
	const { selectedProduct, handleDrawerClose } = props;
	const [productData, setProductData] = useState({
		name: selectedProduct.name || "",
		price: selectedProduct.price || "",
		offerPrice: selectedProduct.offerPrice || "",
	});
	const styles = {
		inputfield:
			"w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
	};

	const handleChange = (e: any) => {
		console.log(e.target.value);
		setProductData({ ...productData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		let endpoint;
		if (selectedProduct._id) {
			endpoint = `/products/${selectedProduct._id}`;
		} else {
			endpoint = `/products`;
		}

		const bodyData = {
			url: `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
			bodyData: {
				name: productData.name,
				price: productData.price,
				offerPrice: productData.offerPrice,
			},
		};

		let data: any;

		if (selectedProduct?._id) {
			data = await doPutApiCall(bodyData);
		} else {
			data = await doPostApiCall(bodyData);
		}
		handleDrawerClose();
		console.log(data, "<<-- data");
	};

	return (
		<>
			{/* Add Product Header */}

			<h1 className="font-semibold text-center py-2 text-2xl border-b-2 border border-b-black">
				Add Product
			</h1>

			{/* Product add form */}

			<form onSubmit={handleSubmit} className="mt-4">
				<div className="relative mb-4 flex flex-col w-full px-4">
					<label
						htmlFor="name"
						className="leading-7 text-sm text-gray-600">
						Product Name
					</label>
					<input
						onChange={handleChange}
						type="name"
						id="name"
						name="name"
						value={productData.name}
						placeholder="Enter your product name"
						className={styles.inputfield}
					/>
				</div>
				<div className="relative mb-4 flex flex-col w-full px-4">
					<label
						htmlFor="price"
						className="leading-7 text-sm text-gray-600">
						Product Price
					</label>
					<input
						onChange={handleChange}
						type="name"
						id="price"
						name="price"
						value={productData.price}
						placeholder="Enter your product price"
						className={styles.inputfield}
					/>
				</div>
				<div className="relative mb-4 flex flex-col w-full px-4">
					<label
						htmlFor="offerPrice"
						className="leading-7 text-sm text-gray-600">
						Product Offer Price
					</label>
					<input
						onChange={handleChange}
						type="name"
						id="offerPrice"
						name="offerPrice"
						value={productData.offerPrice}
						placeholder="Enter your product's offer price"
						className={styles.inputfield}
					/>
				</div>
				<div className="relative mb-4 flex flex-col w-full px-4 mt-4">
					<button
						onClick={handleSubmit}
						className={`py-2 px-3 rounded-md bg-blue-700 mt-3 text-white`}>
						{selectedProduct._id ? "Edit" : "Add"}
					</button>
				</div>
			</form>
		</>
	);
};

export default AddProduct;
