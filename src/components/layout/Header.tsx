
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header style={{ padding: "20px", borderBottom: "1px solid #ccc", display: "flex", justifyContent: "space-between" }}>
            <div className="logo">Logo</div>
            <nav style={{ display: "flex", gap: "10px" }}>
                <Link to="/">Home</Link>
                {/* Add more links as needed in future */}
            </nav>
        </header>
    );
};
