import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useAuthStore } from "./store/useAuthStore";
import LoginPage from "./Pages/LoginPage"
import SignUpPage  from "./Pages/SignUpPage";
import PageLoader from "./components/PageLoader";
import { ChatPage } from "./Pages/ChatPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth) return <PageLoader />

  return (
  <div className="relative min-h-screen w-full overflow-hidden bg-black">
    {/* Background Layer - Fixed behind everything */}
    <div className="fixed inset-0 z-0">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Animated Glows */}
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-40 blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-0 -right-4 size-96 bg-cyan-400 opacity-40 blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-purple-500 opacity-25 blur-[150px]" />
    </div>

    {/* Content Layer - Routes on top */}
    <div className="relative z-10 ">
      <Routes>
        <Route
          path="/"
          element={
            authUser ? <ChatPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          // element={<LoginPage />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
          // element={<SignUpPage />}
        />
      </Routes>
    </div>
    <Toaster />
  </div>
);
};

export default App;
