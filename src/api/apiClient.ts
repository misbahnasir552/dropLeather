import axios from 'axios';
import Router from 'next/router';
// import { useRouter } from 'next/navigation';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your API's base URL
// export const baseURL = 'http://api-gateway.opsdev.telenorbank.pk/';

const apiClient = axios.create({
  baseURL,
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
