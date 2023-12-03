// import dotenv from 'dotenv';
// import Constants from 'expo-constants';
// // 基本、APP_VARIANTに依って使うapiを変える感じだ。
// const endpoint = Constants.expoConfig.extra.apiEndpoint;
// console.log(endpoint);

const baseURL = 'http://http://192.168.11.4:3500'; // local
// const baseURL = endpoint; // local
// const baseURL = 'https://mekka-backend-staging.onrender.com'; // staging
// const baseURL = 'https://mekka-production-server.onrender.com'; // production
// const baseURL = 'https://web-production-8152.up.railway.app/api'; // production
// const baseURL = 'https://mekka-production-1ec261d2f6ac.herokuapp.com'; // production heroku version

export default baseURL;
