import Navbar from "../components/Navbar"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChangeName = (event) => {
        setUsername(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        const payload = {
            username: username,
            password: password
        };

        try {
            const response = await axios.post(
                'https://api.mudoapi.tech/login',
                payload
            );
            const token = response.data.data.token;
            setToken(token);
            localStorage.setItem('access_token', token);

            setTimeout(() => {
                navigate("/")
            }, 2000)
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
                console.log(error.response.data.message);
            } else if (error.request) {
                setError("Tidak ada respon dari server");
                console.log("Tidak ada respon dari server");
            } else {
                setError("Error dalam melakukan request");
                console.log("Error dalam melakukan request", error.message);
            }
        }
    };

    return (
        <div>
            <h1>Ini Login Page</h1>
            <Navbar />

            {token && <h1>Login berhasil</h1>}
            {error && <p>{error}</p>}
            <div>
                <input onChange={handleChangeName} placeholder="masukan username" />
                <input type="password" onChange={handleChangePassword} placeholder="masukan password" />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login
