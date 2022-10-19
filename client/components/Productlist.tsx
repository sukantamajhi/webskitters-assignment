import React, { useEffect, useState } from "react";
import { doDeleteApiCall, doGetApiCall, getLocalStorage } from "api-config";
import { Drawer } from "@mui/material";
import AddProduct from "./AddProduct";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Productlist = () => {
	const drawerWidth = "40%";
	const [anchorEl, setAnchorEl] = useState(false);
	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState({});
	const getAllProducts = async () => {
		const result: any = await doGetApiCall({
			url: `${process.env.NEXT_PUBLIC_API_URL}/products`,
		});
		setProducts(result?.result);
	};
	useEffect(() => {
		getAllProducts();
	}, []);

	const deleteProduct = async (productId: string) => {
		const result: any = await doDeleteApiCall({
			url: `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
		});
		getAllProducts();
	};

	return (
		<div className="flex flex-col relative items-center">
			<div className="w-full flex justify-end items-center">
				{getLocalStorage("user")?._id && (
					<button
						onClick={() => setAnchorEl(true)}
						className={`mr-5 inline-flex items-center border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0 bg-blue-600 text-white`}>
						Add Product
					</button>
				)}
			</div>

			<div className="grid grid-cols-4 gap-2 w-full mt-10">
				<p className="text-center font-bold">Name</p>
				<p className="text-center font-bold">Price</p>
				<p className="text-center font-bold">Offer Price</p>
				<p className="text-center font-bold">Actions</p>
			</div>
			{products?.length > 0 &&
				products.map((product: any) => {
					return (
						<div
							key={product._id}
							className="mt-4 grid grid-cols-4 gap-2 w-full">
							<p className="text-center">{product.name}</p>
							<p className="text-center">{product.price}</p>
							<p className="text-center">{product.offerPrice}</p>
							<p className="text-center">
								<EditIcon
									sx={{ color: "#ff0", cursor: "pointer" }}
									onClick={() => {
										setSelectedProduct(product);
										setAnchorEl(true);
									}}
								/>
								<DeleteIcon
									onClick={() => {
										deleteProduct(product._id);
									}}
									sx={{
										color: "red",
										marginLeft: "10px",
										cursor: "pointer",
									}}
								/>
							</p>
						</div>
					);
				})}
			<div>
				<Drawer
					sx={{
						width: drawerWidth,
						[`& .MuiDrawer-paperAnchorRight`]: {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}
					anchor={"right"}
					open={anchorEl}
					onClose={() => {
						setAnchorEl(false);
						setSelectedProduct({});
					}}>
					<AddProduct
						selectedProduct={selectedProduct}
						handleDrawerClose={() => {
							getAllProducts();
							setAnchorEl(false);
							setSelectedProduct({});
						}}
					/>
				</Drawer>
			</div>
		</div>
	);
};

export default Productlist;
