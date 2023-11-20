import dotenv from 'dotenv';
import Constants from 'expo-constants';
// 基本、APP_VARIANTに依って使うapiを変える感じだ。
const endpoint = Constants.expoConfig.extra.apiEndpoint;
console.log(endpoint);

// const baseURL = 'http://192.168.11.30:3500'; // local
const baseURL = endpoint; // local
// const baseURL = 'https://mekka-backend-staging.onrender.com'; // staging
// const baseURL = 'http://localhost:3500'; // local

console.log('base url is ', baseURL);
export default baseURL;
