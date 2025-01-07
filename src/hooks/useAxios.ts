// 'use client';

// import type { AxiosError, AxiosResponse } from 'axios';
// import { useEffect, useState } from 'react';

// import { apiClient, isLoading } from '@/api/apiClient';

// interface ApiResponse {
//   data: any;
// }

// interface IUseAxios {
//   initialUrl?: string;
//   initialBody?: any;
//   initialConfig?: any;
//   initialMethod?: string;
// }

// const useAxios = () => {
//   const [url, setUrl] = useState<string | undefined>('initialUrl');
//   const [body, setBody] = useState<any>('initialBody');
//   const [method, setMethod] = useState<string | undefined>('initialMethod');
//   const [config, setConfig] = useState<any>('initialConfig');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [response, setResponse] = useState<any>(null);
//   const [error, setError] = useState<AxiosError | null>(null);

//   async function sendHttpRequest(url, method, body, action) {
//     let res: AxiosResponse<ApiResponse>;

//     try {
//       if (method.toLowerCase() === 'post') {
//         console.log('calling POST TRY');
//         res = await apiClient.post(url, body, config);
//         console.log(res, 'response from useaxios');
//         action(res.data);
//         setResponse(res.data);
//         setError(null);
//       } else if (method.toLowerCase() === 'patch') {
//         res = await apiClient.patch(url, body, config);
//         setResponse(res.data);
//         setError(null);
//       } else if (method.toLowerCase() === 'delete') {
//         res = await apiClient.delete(url);
//         setResponse(res.data);
//         setError(null);
//       } else {
//         res = await apiClient.get(url, config);
//         setResponse(res.data);
//         setError(null);
//       }
//     } catch (e: any) {
//       console.log('Unsupported HTTP method or call');
//       setError(e);
//     }
//   }

//   // useEffect(() => {
//   // const fetchData = async () => {
//   //   console.log('calling FETCH DATA');

//   //   setIsLoading(true);
//   //   let res: AxiosResponse<ApiResponse>;
//   //   try {
//   //     if (url) {
//   //       if (method === 'post') {
//   //         console.log('calling POST TRY');
//   //         res = await apiClient.post(url, body, config);
//   //         console.log(res, 'response from useaxios');

//   //         setResponse(res.data);
//   //         setError(null);
//   //       } else if (method === 'patch') {
//   //         res = await apiClient.patch(url, body, config);
//   //         setResponse(res.data);
//   //         setError(null);
//   //       } else if (method === 'delete') {
//   //         res = await apiClient.delete(url);
//   //         setResponse(res.data);
//   //         setError(null);
//   //       } else {
//   //         res = await apiClient.get(url, config);
//   //         setResponse(res.data);
//   //         setError(null);
//   //       }
//   //     }
//   //   } catch (error: any) {
//   //     setResponse(null);
//   //     setError(error);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   // if (method) {
//   //   // fetchData();
//   // }
//   // }, [url]);

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   // const onApiCall = (
//   //   newUrl: string,
//   //   newData: any,
//   //   newConfig: any,
//   //   newMethod: string,
//   // ) => {
//   //   console.log('calling onAPI');

//   //   setUrl(newUrl);
//   //   setBody(newData);
//   //   setMethod(newMethod);
//   //   setConfig(newConfig);
//   //   fetchData();
//   // };
//   // function onAction(data: any) {
//   //   console.log('ACTION CALLING', data);
//   //   if (data.responseCode === '000') {
//   //     dispatch(
//   //       addFormData({
//   //         ...values,
//   //         merchantType: searchParams.get('option') || 'optionNotDefined',
//   //       }),
//   //     );
//   //     router.push(
//   //       `/sign-up/personal-info/otp/?expiry=${data.expirationTime}`,
//   //     );
//   //   }

//   //   // data.then((d: any) => console.log(d, 'response from axios dataaaa'));
//   // }
//   // sendPostRequest('merchant/onboard/register', 'post', values, onAction);
//   // console.log('after sendPostRequest', data);

//   return [response, error, sendHttpRequest];
// };

// export default useAxios;
