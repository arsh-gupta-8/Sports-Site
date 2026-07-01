import { Link } from "react-router-dom";
import { useContext } from "react";
import { userData } from "../context/UserDataContext";

function Navbar() {

    const { currency, setCurrency, predictions, setPredictions } = useContext(userData);

    return (
        <nav className="navbar" style={{
            color: "blue",
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "rgba(255, 255, 255, 0.05)"
        }}>
            <div className="Logo">
                <p style={{ textDecoration: "none", color: "#4682B4", padding: "20px", fontWeight: "bold", fontSize: "1.5rem"}}>SportPredictor</p>
            </div>
            <div className="Tabs" style={{
                display: "flex",
                gap: "30px",
                alignItems: "center"
            }}>
                <Link to="/" style={{ textDecoration: "none", color: "#4682B4", padding: "10px" }}>Home</Link>
                <Link to="/WorldCup" style={{ textDecoration: "none", color: "#4682B4", padding: "10px" }}>World Cup</Link>
                <p style={{ textDecoration: "none", color: "#cacaca", padding: "10px" }}>Wallet: {currency}</p>
            </div>
        </nav>
    );
}

export default Navbar;