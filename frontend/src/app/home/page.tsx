"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const refreshToken = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) {
      console.error('No refresh token found');
      return;
    }
  
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
        refresh: refresh_token,
      });
  
      // Update the access token in localStorage
      localStorage.setItem('access_token', res.data.access);
    } catch (error) {
      console.error('Failed to refresh token', error);
    }
  };
  

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/');  // Redirect to login page if no token
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    if (!isAuthenticated) {
        return <div>Loading...</div>;  // Optionally show a loading spinner
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
        router.push('/');  // Redirect to login page
        // Redirect user to login page
    };

    return (
        <div>
            <h1>You are authenticated!!!</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                Logout
            </button>

        </div>
    );
}