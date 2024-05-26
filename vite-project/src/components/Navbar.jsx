import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };

    const token = localStorage.getItem("access_token");

    return (
        <div>
            <Link to="/">
                <h1>Home</h1>
            </Link>
            
            <Link to="/menus/add">
                <h1>Add Menu</h1>
            </Link>

            {!token ? (
                <Link to="/login">
                    <h1>Login</h1>
                </Link>
            ) : (
                <button onClick={handleLogout}>Logout</button>
            )}
        </div>
    );
};

export default Navbar;

