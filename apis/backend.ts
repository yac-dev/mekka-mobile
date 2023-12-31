import axios from 'axios';
import baseURL from './baseURL';
// import Constants from 'expo-constants';
// 基本、APP_VARIANTに依って使うapiを変える感じだ。
// const endpoint = Constants.expoConfig.extra.apiEndpoint;
import Config from 'react-native-config';

// login後、動かね〜。。。
const backendAPI = axios.create({
  baseURL: Config.API_ENDPOINT,
  // baseURL: Constants.expoConfig.extra.apiEndpoint, // local
  // baseURL: 'http://192.168.11.4:3500/api', // local
  // baseURL: 'https://mekka-staging-955e17db8bae.herokuapp.com/api', // staging // heroku version
  // baseURL: 'https://mekka-production-1ec261d2f6ac.herokuapp.com/api', // production // heroku version

  // baseURL: 'http://10.113.214.33:3500/api', // local
  // baseURL: 'https://mekka-backend-staging.onrender.com/api' // staging
  // baseURL: 'https://dull-tan-barnacle-cuff.cyclic.app/api', // production // cyclic version
  // baseURL: 'https://web-production-8152.up.railway.app/api', // production // railway version
});

export default backendAPI;
