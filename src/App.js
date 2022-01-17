import Home from "./screens/Home";
import Admin from "./screens/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</Router>
	);
}
