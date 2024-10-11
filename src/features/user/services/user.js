import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


const getTokenFromLocalStorage = () => {
    const user = window.localStorage.getItem('sns_user');
    if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser.token;
    }
    return null;
};

const updateUser = async (user) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await axios.put(`/apihost/api/v1/me`, user, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during user update:', error);
        throw error;
    }
};

const getUser = async () => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await axios.get(`/apihost/api/v1/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during user fetch:', error);
        throw error;
    }
};
const unFollowUser = createAsyncThunk("user/unfollow", async ({ followUserId, token }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/v1/me/following/${followUserId}`,
            {},
            {
                headers: { authorization: token }
            });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return rejectWithValue(error.response.data.errors[0]);
    }
});

const followUser = createAsyncThunk("user/follow",
    async ({ followUserId, token }, { rejectWithValue }) => {
        try {
            const { status, data } = await axios.post(`/api/v1/me/following/${followUserId}`,
                {},
                {
                    headers: { authorization: token }
                });

            if (status === 200) {
                return data;
            }
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0]);
        }
    });

const getFollowing = createAsyncThunk("user/following", async (_, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();
    try {
        const { status, data } = await axios.get(`http://localhost:3000/users`, {
            headers: { authorization: token }
        });

        if (status === 200) {
            console.log(data);
            return data;
        }
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data?.errors[0] || 'Unknown error');
    }
});


const updatePassWord = createAsyncThunk("user/update-password", async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    if (!token) {
        alert('No authentication token found');
        return rejectWithValue('No authentication token');
    }
    try {
        const response = await axios.put(`/apihost/api/v1/me/password`, {
            currentPassword,
            newPassword
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            alert('Passwords updated successfully:', response.data);
            return response.data;
        }
    } catch (error) {
        alert('Incorrect old password');
        return rejectWithValue(error.response?.data.errors[0] || 'Update failed');
    }
});


export default { updateUser, getUser, unFollowUser, followUser, getFollowing, updatePassWord };

