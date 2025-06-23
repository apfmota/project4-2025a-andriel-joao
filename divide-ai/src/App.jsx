import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "./pages/auth";
import Home from "./pages/home";
import NoPage from "./pages/nopage";
import QrCode from "./pages/qrcode";
import Table from "./pages/table";
import Profile from "./pages/profile";
import Notas from "./pages/notas";
import Charts from "./pages/charts";
import "./App.css";
import ViewPurchase from "./pages/viewPurchase";
import GoogleRegister from "./pages/googleRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/qrcode" element={<QrCode />} />
        <Route path="/table" element={<Table />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notas" element={<Notas />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/view-purchase" element={<ViewPurchase />} />
        <Route path="/google-register" element={<GoogleRegister />} />
        {/* Rota coringa para páginas não encontradas */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
