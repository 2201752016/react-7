import Login from "../pages/Login";
import Home from "../pages/Home";
import DetailMenu from "../pages/DetailMenu";
import AddMenuItem from "../pages/AddMenuItem";
import ProtectedRoute from "../routes/ProtectedRoute";

export const routeList = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/menu/:id",
        element: (
            <ProtectedRoute>
                <DetailMenu />
            </ProtectedRoute>
        )
    },
    {
        path: "/menus/add",
        element: (
            <ProtectedRoute>
                <AddMenuItem />
            </ProtectedRoute>
        )
    }
];

