import React, { useEffect, useState } from "react";
import { doGetApiCall } from "api-config";
const Productlist = () => {
	const [products, setProducts] = useState([]);
	const getAllProducts = async () => {
		const result: any = await doGetApiCall({
			url: `${process.env.NEXT_PUBLIC_API_URL}/products`,
		});
		setProducts(result?.result);
	};
	useEffect(() => {
		getAllProducts();
	}, []);
	return (
		<div className="flex flex-col items-center">
			<div className="grid grid-cols-3 gap-2 w-full">
				<p className="text-center font-bold">Name</p>
				<p className="text-center font-bold">Price</p>
				<p className="text-center font-bold">Offer Price</p>
			</div>
			{products?.length > 0 &&
				products.map((product: any) => {
					return (
						<div
							key={product._id}
							className="mt-4 grid grid-cols-3 gap-2 w-full">
							<p className="text-center">{product.name}</p>
							<p className="text-center">{product.price}</p>
							<p className="text-center">{product.offerPrice}</p>
						</div>
					);
				})}
		</div>
	);
};

export default Productlist;
