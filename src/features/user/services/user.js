import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


const updateUser = async (user) => {
    try {
        const response = await axios.put('http://localhost:3001/users/1', user);
        return response.data;
    } catch (error) {
        console.error('Error during user update:', error);
        throw error;
    }
}

const getUser = async (id) => {
    try {
        const response = await axios.get('http://localhost:3001/users/1');
        return response.data;
    } catch (error) {
        console.error('Error during user fetch:', error);
        throw error;
    }
}

const unFollowUser = createAsyncThunk("user/unfollow", async ({ followUserId, token }, { rejectWithValue }) => {
    try {
        const { status, data } = await axios.delete(`/api/v1/me/following/${followUserId}`,
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

const getFollowing = createAsyncThunk("user/following",
    async ({ userId, token }, { rejectWithValue }) => {
        try {
            const { status, data } = await axios.get(`/api/v1/me/${userId}/following`,

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


export default {updateUser, getUser, unFollowUser, followUser, getFollowing};