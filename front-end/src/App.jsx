import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AppPage from "./pages/AppPage";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import BudgetPage from "./pages/BudgetPage";

export default function App() {
  const [signedIn, setSignedIn] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch("/api/auth/check-auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200 || res.ok) {
          setSignedIn(true);
        } else {
          setSignedIn(false);
        }
      } catch (err) {
        console.error(
          "There was an error during the user authentication confirmation procedure. Error: ",
          err
        );
        setSignedIn(false);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <BrowserRouter>
      <Header signedIn={signedIn} setSignedIn={setSignedIn} />
      <Routes>
        <Route element={<AuthenticatedRoute signedIn={signedIn} />}>
          <Route
            path="/auth"
            element={<AuthPage signedIn={signedIn} setSignedIn={setSignedIn} />}
          />
        </Route>
        <Route element={<PrivateRoute signedIn={signedIn} />}>
          <Route path="/" element={<AppPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/budget/:budgetId" element={<BudgetPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
