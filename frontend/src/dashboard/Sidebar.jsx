import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../contest/Authprovider';
import axios from 'axios';

export default function Sidebar({ setComponent, setMyPro ,myPro}) {
    const {  loading } = useAuth();
    const navigate = useNavigate();

    const gotoHome = () => {
        navigate('/');
    };

    const handleLogout = async () => {
        try {
            await axios.get('https://blogappfullstackmern.onrender.com/users/logout', { withCredentials: true });
            setMyPro(null);
            navigate('/');
        } catch (err) {
            console.log('logout dashboard', err);
        }
    };

    if (!loading) {
        return <p>Loading...</p>;
    }

    if (!myPro) {
        return <p>No user data available</p>;
    }

    return (
        <div className="h-full w-full flex flex-col items-center p-4 bg-gray-100">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src={myPro.photo}
                    alt="User"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-400"
                />
                <p className="mt-2 text-lg font-semibold text-gray-800">{myPro.name}</p>
            </div>

            {/* Menu Buttons */}
            <ul className="flex flex-col gap-3 w-full px-4">
                <button
                    onClick={() => setComponent('my blogs')}
                    className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    My Blogs
                </button>
                <button
                    onClick={() => setComponent('create blog')}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Create Blog
                </button>
                <button
                    onClick={() => setComponent('my profile')}
                    className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                    My Profile
                </button>
                <button
                    onClick={gotoHome}
                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Home
                </button>
                <button
                    onClick={handleLogout}
                    className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                    Logout
                </button>
            </ul>
        </div>
    );
}
