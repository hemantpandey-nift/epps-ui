import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./utils/NotFound";
import UserGrid from "./components/userGrid/UserGrid";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserGrid />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
