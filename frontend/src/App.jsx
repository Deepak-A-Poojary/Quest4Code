import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import HomePage from "./Page/HomePage";
import LoginPage from "./Page/LoginPage";
import SignUpPage from "./Page/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Layout from "./layout/Layout";
import { useThemeColors } from "./hooks/useThemeColors";
import AddProblem from "./Page/AddProblem";
import AdminRoute from "./components/AdminRoute";
import ProblemPage from "./Page/ProblemPage";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const themeColors = useThemeColors();
  const location = useLocation();

  useEffect(() => {
    const publicPaths = ["/login", "/register"];
    if (!publicPaths.includes(location.pathname)) {
      checkAuth(); // ✅ only check auth on protected routes
    }
  }, [location.pathname]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <Loader className="size-10 animate-spin text-indigo-600" />
        <span className="sr-only">Loading authentication status...</span>
      </div>
    );
  }

  return (
    <div
      className="flex overflow-hidden w-vw flex-col items-center justify-start"
      style={{
        background: themeColors.background,
        color: themeColors.text,
      }}
    >
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUpPage />}
        />

        <Route
          path="/problems/get-problem/:problemId"
          element={authUser ? <ProblemPage /> : <Navigate to="/login" />}
        />
        <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
