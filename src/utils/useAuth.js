import { useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [message, setMessage] = useState("");
    const api = "https://api.kickstarrt.com/api";

    // Login function
    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${api}/user/login`, credentials)
            setMessage(response.data.message)
            const { token, userDetails } = response.data.data;
            setData(userDetails);
            console.log(data);
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

    // registerUser function
    const registerUser = async (credentials) => {
        setLoading(true);
        setError(null);
        setMessage("")
        try {
            const response = await axios.post(`${api}/user/register`,
                {
                    firstName: credentials.firstName,
                    lastName: credentials.lastName,
                    email: credentials.email,
                    password: credentials.password,
                    registeredDevice: 1,
                    phoneNumber: credentials.phoneNumber,
                    referralCode: null
                }
            );
            setMessage(response.data.message)
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

    return { login, registerUser, loading, error, data, message };
};

