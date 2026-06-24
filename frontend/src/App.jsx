import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import WorldCup from "./pages/WorldCup"
import Home from "./pages/Home"

function App() {

    return (
        <main className="main-content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/WorldCup" element={<WorldCup />} />
            </Routes>
        </main>
    );

}

export default App;

