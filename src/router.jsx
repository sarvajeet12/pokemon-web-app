import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Error from "./pages/error.jsx";
import Home from "./pages/home.jsx";
import Individual from "./pages/individual.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/single/:id", element: <Individual /> },
            { path: "*", element: <Error /> },
        ],
    },
]);