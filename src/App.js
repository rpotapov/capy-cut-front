import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShortenForm from "./components/ShortenForm";
import RedirectComponent from "./components/RedirectComponent";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <ShortenForm />
            </div>
          }
        />
        <Route path="/:shortParam" element={<RedirectComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
