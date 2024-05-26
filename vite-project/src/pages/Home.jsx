import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        axios.get('https://api.mudoapi.tech/menus?perPage=15')
            .then(response => {
                setMenus(response.data.data.Data);
            })
            .catch(error => {
                console.error('Error fetching the menus', error);
            });
    }, []);

    return (
        <div>
            <h1>ini Home Page</h1>
            <Navbar />
            <ul>
                {menus.map((menu) => (
                    <li key={menu.id}>
                        <Link to={`/menu/${menu.id}`}>
                            <h2>{menu.name}</h2>
                            <p>{menu.priceFormatted}</p>
                            <img width={400} src={menu.imageUrl} alt={menu.name} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;

