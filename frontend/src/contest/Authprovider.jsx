import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
export const AuthContest = createContext();

function Authprovider({ children }) {
    const [blogs, setBlogs] = useState();
    const [users, setUsers] = useState();
    const [myPro, setMyPro] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch profile from backend
    const myProfile = async () => {
        try {


            const { data } = await axios.get(
                'https://blogappfullstackmern.onrender.com/users/my-profile',
                { withCredentials: true }
            );
            setMyPro(data);

        } catch (err) {
            console.log('Error fetching profile:', err.response?.data || err.message);
            setMyPro(null);
        } finally {
            setLoading(true);
        }
    };

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('https://blogappfullstackmern.onrender.com/blogs/all-blogs');
            setBlogs(data);
        } catch (err) {
            console.log('Error fetching blogs:', err);
        }
    };

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('https://blogappfullstackmern.onrender.com/users/admins');
            setUsers(data);
        } catch (err) {
            console.log('Error fetching users:', err);
        }
    };
    useEffect(() => {

        fetchBlogs();
        fetchUsers();
        myProfile(); // ✅ always fetch profile when app loads
    }, []);

    return (
        <AuthContest.Provider value={{ blogs, users, myPro, setMyPro, loading,fetchBlogs }}>
            {children}
        </AuthContest.Provider>
    );
}

export default Authprovider;

export const useAuth = () => {
    return useContext(AuthContest);
};
