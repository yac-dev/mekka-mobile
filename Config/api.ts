import axios from 'axios';
import Config from 'react-native-config';
// 'http://192.168.11.4:3500/api', // local
// 'https://mekka-staging-955e17db8bae.herokuapp.com/api', // staging // heroku version
// 'https://mekka-production-1ec261d2f6ac.herokuapp.com/api', // production // heroku version

export const api = axios.create({
  baseURL: Config.API_ENDPOINT,
});
export const appURL = Config.BASEURL;
// 今これないかも。。。
