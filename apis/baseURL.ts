// import dotenv from 'dotenv';
// import Constants from 'expo-constants';
// // 基本、APP_VARIANTに依って使うapiを変える感じだ。
// const endpoint = Constants.expoConfig.extra.apiEndpoint;
// console.log(endpoint);
import Config from 'react-native-config';
const baseURL = Config.BASEURL; // local development
// const baseURL = 'https://mekka-staging-955e17db8bae.herokuapp.com'; // staging heroku version
// const baseURL = 'https://mekka-production-1ec261d2f6ac.herokuapp.com'; // production heroku version

// const baseURL = endpoint; // local
// const baseURL = 'https://mekka-backend-staging.onrender.com'; // staging
// const baseURL = 'https://mekka-production-server.onrender.com'; // production
// const baseURL = 'https://web-production-8152.up.railway.app/api'; // production

export default baseURL;
