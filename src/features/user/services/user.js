import axios from 'axios';

const getTokenFromLocalStorage = () => {
    const user = window.localStorage.getItem('sns-user');
    if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser.token;
    }
    return null;
};

const updateUser = async (id, user) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await axios.put(`/apihost/api/v1/usersUpdate/${id}`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during user update:', error);
        throw error;
    }
};

const getUser = async (id) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await axios.get(`/apihost/api/v1/user/${id}`, {
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

export default { updateUser, getUser };
