import HomePage from "./pages/HomePage";
import PokemonDetailPage from "./pages/PokemonDetailPage";
import ItemsPage from "./pages/ItemsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./pages/layout";
import { createBrowserRouter, RouterProvider } from "react-router";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <NotFoundPage />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "pokemon/:id", element: <PokemonDetailPage /> },
			{ path: "items", element: <ItemsPage /> },
		],
	},
]);
export default function MainRouter() {
	return <RouterProvider router={router} />;
}
