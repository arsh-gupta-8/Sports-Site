import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [currency, setCurrency] = useState(() => {
        const item = getItem("Currency");
        return item || 1000;
    });

    return (
        <nav className="navbar">
            <div className="Logo">

            </div>
            <div className="Tabs">

            </div>
        </nav>
    );
}

export default Navbar;