import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMenuItem = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
        imageUrl: '',
        price: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
    
        const formDataWithIntegerPrice = {
            ...formData,
            price: parseInt(formData.price) || 0
        };
    
        if (formData.type !== "beverage" && formData.type !== "main-dish") {
            setError('Type only accepts either "beverage" or "main-dish"');
            return;
        }
    
        try {
            const response = await axios.post('https://api.mudoapi.tech/menu', formDataWithIntegerPrice, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            alert('Menu item added successfully');
            navigate('/');
        } catch (error) {
            console.error('Error adding menu item:', error);
            setError('Error adding menu item');
        }
    };
    

    return (
        <div>
            <h1>Add Menu Item</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Type:
                        <input type="text" name="type" value={formData.type} onChange={handleChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <input type="text" name="description" value={formData.description} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Image URL:
                        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </label>
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddMenuItem;

