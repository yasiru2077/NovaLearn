import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/login";
import NotFound from "./content/not-found";
import Layout from "./content/layout";
import Home from "./pages/home/home";

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem("userDetails");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");
    if (userDetails) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  }, [isAuthenticated, userDetails]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setUserDetails={setUserDetails}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<Layout setIsAuthenticated={setIsAuthenticated} />}>
            <Route path="/" element={<Home userDetails={userDetails} />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
