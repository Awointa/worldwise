import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="login" element={<Login />} />
				<Route path="/app" element={<AppLayout />}>
					<Route index element={<p>List Of Cities</p>} />
					<Route path="cities" element={<p>List of Cities</p>} />
					<Route path="countries" element={<p>countries</p>} />
					<Route path="form" element={<p>Form</p>} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
