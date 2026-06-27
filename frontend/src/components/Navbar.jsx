import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar" style={{
            color: "blue",
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#464646"
        }}>
            <div className="Logo">
                <p style={{ textDecoration: "none", color: "#49a6f1", padding: "10px", fontWeight: "bold"}}>Sporta</p>
            </div>
            <div className="Tabs" style={{
                display: "flex",
                gap: "30px"
            }}>
                <Link to="/" style={{ textDecoration: "none", color: "#9bc3f1", padding: "10px" }}>Home</Link>
                <Link to="/WorldCup" style={{ textDecoration: "none", color: "#9bc3f1", padding: "10px" }}>World Cup</Link>
            </div>
        </nav>
    );
}

export default Navbar;