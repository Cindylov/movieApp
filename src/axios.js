import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://movieapp.up.railway.app', // backend server
});

export default instance;
