import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./Routes/SignIn";
import SignUp from "./Routes/SignUp";
import Home from "./Routes/Home";
import Chat from "./Routes/Chat";
import { useAppSelector } from "./store/store";
import { selectIsAuth } from "./store/state/state-selector";
import React from "react";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const isAuth = useAppSelector(selectIsAuth);
  if (isAuth) return children as React.ReactElement;
  return <Navigate to="/signIn" />;
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard>
              <Home />
            </RouteGuard>
          }
        />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/chat"
          element={
            <RouteGuard>
              <Chat />
            </RouteGuard>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
