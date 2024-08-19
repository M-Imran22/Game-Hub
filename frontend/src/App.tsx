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
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index={true}
              path="/admin/dashboard"
              element={<Dashboard />}
            />
            <Route path="/admin/allproducts" element={<AllGameProduct />} />
            <Route path="newgame" element={<AdminNewGamePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
