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
const getFollowing = createAsyncThunk("user/following", async (_, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();
    try {
        const { status, data } = await axios.get(`/apihost/api/v1/me/following`, {
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

const getWaiting = createAsyncThunk("user/waiting", async (_, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();
    try {
        const { status, data } = await axios.get(`/apihost/api/v1/me/followers`, {

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

export default { getFollowing, getWaiting }
