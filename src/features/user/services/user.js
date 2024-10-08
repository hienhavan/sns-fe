import axios from "axios";

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

export default {updateUser, getUser};