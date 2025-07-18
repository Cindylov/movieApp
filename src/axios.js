import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://movieapp.up.railway.app', // backend server
});

export default instance;
