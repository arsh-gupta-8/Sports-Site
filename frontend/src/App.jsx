import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import WorldCup from "./pages/WorldCup"
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import UserDataProvider from "./context/UserDataContext"

function App() {
    
    return (
        <UserDataProvider>
            <div>
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/WorldCup" element={<WorldCup />} />
                    </Routes>
                </main>
            </div>
        </UserDataProvider>
    );

}

export default App;

