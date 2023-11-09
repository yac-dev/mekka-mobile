import axios from 'axios';
import baseURL from './baseURL';

// login後、動かね〜。。。
const backendAPI = axios.create({
  baseURL: 'http://192.168.11.3:3500/api', // local
  // baseURL: 'http://10.113.214.33:3500/api', // local
  // baseURL: 'http://localhost:3500/api', // local
});

export default backendAPI;
