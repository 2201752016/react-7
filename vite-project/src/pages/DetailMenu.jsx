import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailMenu = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menuDetail, setMenuDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://api.mudoapi.tech/menu/${id}`)
            .then(response => {
                setMenuDetail(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching menu details');
                setLoading(false);
            });
    }, [id]);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.delete(`https://api.mudoapi.tech/menu/${id}`, config);
            navigate("/");
        } catch (error) {
            setError('Error deleting menu');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Detail Menu</h1>
            {menuDetail && (
                <div>
                    <h2>{menuDetail.name}</h2>
                    <p>{menuDetail.description}</p>
                    <p>{menuDetail.type}</p>
                    <img width={400} src={menuDetail.imageUrl} alt={menuDetail.name} />
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default DetailMenu;