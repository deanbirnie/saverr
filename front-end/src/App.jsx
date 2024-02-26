import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AppPage from "./pages/AppPage";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

export default function App() {
  const signedIn = true;
  return (
    <BrowserRouter>
      <Header signedIn={signedIn} />
      <Routes>
        <Route element={<AuthenticatedRoute signedIn={signedIn} />}>
          <Route path="/auth" element={<AuthPage signedIn={signedIn} />} />
        </Route>
        <Route element={<PrivateRoute signedIn={signedIn} />}>
          <Route path="/" element={<AppPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
