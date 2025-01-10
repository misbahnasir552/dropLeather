import axios from 'axios';
// import Cookies from 'js-cookie';
import Router from 'next/router';
// import { useRouter } from 'next/navigation';

// export const baseURL = '/api'; // Replace with your API's base URL
export const baseURL = 'http://api-gateway-opsdev.telenorbank.pk/';
// export const baseURL = 'http://http://merchant-service-opsdev.telenorbank.pk/';
// const csrf = Cookies.get('csrfToken');
// console.log('CSRF token apiclient', csrf);

const apiClient = axios.create({
  baseURL,
  timeout: 100000, // Optional: Timeout after 5 seconds
  // headers: {
  //   'Content-Type': 'application/json',
  //   // 'Authorization': 'Bearer YOUR_TOKEN_HERE', // Example for a token
  //   // 'X-Custom-Header': 'CustomValue',         // Example for a custom header
  //   'x-csrf-token':
  //     '840cb4d46c53474b29f9fd696e28991307ae22e35769048df0bf4b4269e3dc98',
  //   obaid: null,
  // },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        'Response error apiClient:',
        error.response.status,
        error.response.data,
      );
      Router.push('/error');
      throw new Error(error.response.data);
    } else if (error.request) {
      console.error('Request error apiClient:', error.message);
      Router.push('/error');
      throw new Error(error.message);
    } else {
      console.error('Network Error ----Something went wrong:', error.message);
      Router.push('/error');
      throw new Error(error);
    }
    // return Promise.reject(error);
  },
);

export default apiClient;
