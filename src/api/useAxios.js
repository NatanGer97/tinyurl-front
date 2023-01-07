import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStoreage';

export default axios.create({
    baseURL: 'http://localhost:3001/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },

});