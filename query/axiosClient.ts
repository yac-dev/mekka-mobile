import axios from 'axios';
import Config from 'react-native-config';

export const axiosClient = axios.create({
  baseURL: Config.API_ENDPOINT,
});
