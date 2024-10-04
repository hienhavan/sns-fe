import axios from "axios";

const registration = async ({email, password}) => {
    try {
        const response = await axios.post('/api/v1/register', {
            email,  
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;  
    }
}

export default {
    registration,
}