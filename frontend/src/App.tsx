import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import ClientLayout from "./pages/Clientlayout";
import Home from "./pages/Home";
import GameDetailPage from "./pages/GameDetailPage";
import AdminLayout from "./pages/Adminlayout";
import AllGameProduct from "./components/Admin/allGames/AllGmeProduct";
import AdminNewGamePage from "./pages/AdminNewGamePage";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./components/Admin/Dashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminSignupPage from "./pages/AdminSignupPage";
import NotFound from "./components/NotFound";
import AdminEditGamePage from "./pages/AdminEditGamePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<ClientLayout />}>
          <Route index={true} element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
          <Route path="/" element={<ClientLayout />}>
            <Route path="games/:gameName" element={<GameDetailPage />} />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index path="login" element={<AdminLoginPage />} />
          <Route path="signup" element={<AdminSignupPage />} />

          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="allproducts" element={<AllGameProduct />} />
            <Route path="newgame" element={<AdminNewGamePage />} />
            <Route path=":id/edit" element={<AdminEditGamePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
