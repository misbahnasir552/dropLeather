// import axios from 'axios';
// // import Cookies from 'js-cookie';
// // import { useRouter } from 'next/navigation';

// // export const baseURL = '/api'; // Replace with your API's base URL
// export const baseURL = 'http://api-gateway-opsdev.telenorbank.pk/';
// // export const baseURL = 'http://http://merchant-service-opsdev.telenorbank.pk/';
// // const csrf = Cookies.get('csrfToken');
// // console.log('CSRF token apiclient', csrf);

// const apiClient = axios.create({
//   baseURL,
//   timeout: 100000, // Optional: Timeout after 5 seconds
//   // headers: {
//   //   'Content-Type': 'application/json',
//   // },
// });

// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log("Errorrrrr API CLIENT: ", error);

//     if (error.response) {
//       console.error(
//         'Response error apiClient:',
//         error.response.status,
//         error.response.data,
//       );
//       throw new Error(error.response);
//     }
//     else if (error.request) {
//       console.error('Request error apiClient:', error.message);
//       throw new Error(error.message);
//     } else {
//       console.error('Network Error ----Something went wrong:', error.message);
//       throw new Error(error);
//     }
//   },
// );

// export default apiClient;

// new code with provider

import axios from 'axios';

import { setLogout } from '@/redux/features/authSlice';

export const baseURL = 'http://api-gateway-opsdev.telenorbank.pk/';

const apiClient = axios.create({
  baseURL,
  timeout: 100000, // Timeout after 100 seconds
});

export const setupApiClient = (dispatch: any, router: any) => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('Error API CLIENT:', error);

      if (error.response?.status === 401) {
        /* eslint-disable-next-line no-alert */
        alert('Session Timeout. Please login asain to proceed');
        console.log(
          'Unauthorized Access (401):',
          error.response.status,
          error.response.data,
        );

        // Dispatch Redux actions
        if (dispatch) {
          dispatch(setLogout()); // Replace with your actual logout action
        }

        // Navigate using router
        if (router) {
          router.push('/login'); // Redirect to login
        }
      }
      // else if (error.response) {
      //   console.error(
      //     'Response error apiClient:',
      //     error.response.status,
      //     error.response.data
      //   );
      // }
      else if (error.request) {
        console.error('Request error apiClient:', error.message);
      } else {
        console.error(
          'Network Error ---- Something went wrong:',
          error.message,
        );
      }

      return Promise.reject(error);
    },
  );
};

export default apiClient;
