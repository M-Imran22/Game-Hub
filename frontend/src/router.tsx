import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import GameDetailPage from "./pages/GameDetailPage";
import ErrorPage from "./pages/ErrorPage";
import AdminAllProducesPage from "./pages/AdminAllProducesPage";
import AdminLayout from "./pages/Adminlayout";
import ClientLayout from "./pages/Clientlayout";
import AdminNewGamePage from "./pages/AdminNewGamePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "games/:gameName", element: <GameDetailPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminAllProducesPage /> },
      { path: "newgame", element: <AdminNewGamePage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

export default router;
