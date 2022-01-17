import React from "react";
import Navbar from "../components/MainLayout/Navbar";

export default function MainLayout({ children }) {
	return (
		<div>
			<Navbar />
			<div className="py-4" style={{ position: "relative" }}>
				{children}
			</div>
			<div className="bg-white" style={{ position: "relative", height: "200px" }}></div>
		</div>
	);
}
