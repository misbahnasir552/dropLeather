// axios old
// import axios from 'axios';
// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// export async function POST(req: NextRequest): Promise<NextResponse> {
//   try {
//     // Extract the current route path
//     const currentPath = new URL(req.url).pathname;

//     // Build the external API URL
//     const externalApiUrl = `${
//       process.env.NEXT_PUBLIC_BASE_URL
//     }${currentPath.replace('/api', '')}`;
//     console.log('ExternalApiURL:', externalApiUrl);

//     // Parse the request body
//     const reqBody = await req.json();
//     console.log('Request Body:', reqBody);

//     // Convert Next.js headers object into a plain object
//     const reqHeaders: Record<string, string> = Object.fromEntries(
//       req.headers.entries(),
//     );
//     console.log('Request Headers:', reqHeaders);

//     // Check if the externalApiUrl is valid
//     if (!externalApiUrl) {
//       return NextResponse.json(
//         { error: 'Missing externalApiUrl in the request body' },
//         { status: 400 },
//       );
//     }
//     const sanitizedUrl = externalApiUrl.replace(/\/$/, '');

//     console.log(sanitizedUrl, 'SAN');
//     const response: any = await axios.post(
//       sanitizedUrl,
//       {},
//       {
//         headers: {
//           ...reqHeaders,
//         },
//       },
//     );

//     // Log the response from the external API
//     console.log('External API Response:', response.data);

//     // Return the response from the external API
//     return NextResponse.json(response.data, { status: response.status });
//   } catch (error: any) {
//     console.error('Error in generic proxy handler:', error.message);
//     return NextResponse.json(
//       {
//         error: 'Failed to proxy the external API call',
//         details: error.response?.data || error.message,
//       },
//       { status: error.response?.status || 500 },
//     );
//   }
// }

import axios from 'axios';
import Cookies from 'js-cookie';
// import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { generateMD5Hash } from '@/utils/helper';

// export async function POST(req: NextRequest): Promise<NextResponse> {
//   try {
//     // Extract the current route path
//     const currentPath = new URL(req.url).pathname;

//     // Build the external API URL
//     const externalApiUrl = `${
//       process.env.NEXT_PUBLIC_BASE_URL
//     }${currentPath.replace('/api', '')}`;
//     console.log('ExternalApiURL:', externalApiUrl);

//     // Parse the request body
//     const reqBody = await req.json();
//     console.log('Request Body:', reqBody);

//     // Convert Next.js headers object into a plain object
//     const reqHeaders: Record<string, string> = Object.fromEntries(
//       req.headers.entries(),
//     );
//     console.log('Request Headers:', reqHeaders);

//     // Check if the externalApiUrl is valid
//     if (!externalApiUrl) {
//       return NextResponse.json(
//         { error: 'Missing externalApiUrl in the request body' },
//         { status: 400 },
//       );
//     }
//     const sanitizedUrl = externalApiUrl.replace(/\/$/, '');

//     console.log(sanitizedUrl, 'SANITIZED POST');
//     const response: any = await fetch(sanitizedUrl, {
//       method: 'POST',
//       headers: {
//         ...reqHeaders,
//       },
//       body: JSON.stringify(reqBody),
//     });

//     const responseData = await response.json();

//     // Log the response from the external API
//     console.log('External API Response:', responseData);

//     // Return the response from the external API
//     return NextResponse.json(responseData, { status: response.status });
//   } catch (error: any) {
//     console.error('Error in generic proxy handler:', error.message);
//     return NextResponse.json(
//       {
//         error: 'Failed to proxy the external API call',
//         details: error.response?.data || error.message,
//       },
//       { status: error.response?.status || 500 },
//     );
//   }
// }

// working
// export async function POST(req: NextRequest): Promise<NextResponse> {
//   try {
//     console.log('POST CALL...');

//     // Extract the current route path
//     const url = new URL(req.url);
//     const currentPath = new URL(req.url).pathname;

//     // Build the external API URL
//     const externalApiUrl = `${
//       process.env.NEXT_PUBLIC_BASE_URL
//     }${currentPath.replace('/api', '')}`;
//     console.log('ExternalApiURL:', externalApiUrl);
//     let sanitizedUrl = externalApiUrl.replace(/\/$/, '');
//     console.log(sanitizedUrl, 'SANITIZED POST');

//     // Append query parameters if present
//     const queryParams = url.searchParams.toString();
//     if (queryParams) {
//       sanitizedUrl += `?${queryParams}`;
//     }
//     console.log('ExternalApiURL with Params:', sanitizedUrl);

//     // Parse the request body
//     const contentType = req.headers.get('content-type') || '';
//     let reqBody: any;

//     if (contentType.includes('application/json')) {
//       reqBody = await req.json();
//       console.log('JSON Request Body:', reqBody);
//     } else if (contentType.includes('multipart/form-data')) {
//       reqBody = await req.formData(); // Parses FormData
//       console.log('FormData Request Body:', reqBody);
//     } else {
//       throw new Error('Unsupported Content-Type in request');
//     }

//     // Convert Next.js headers object into a plain object
//     const reqHeaders: Record<string, string> = Object.fromEntries(
//       req.headers.entries(),
//     );
//     console.log('Request Headers:', reqHeaders);

//     // Check if the externalApiUrl is valid
//     if (!externalApiUrl) {
//       return NextResponse.json(
//         { error: 'Missing externalApiUrl in the request body' },
//         { status: 400 },
//       );
//     }

//     // Set up the body for fetch based on content type
//     const fetchOptions: RequestInit = {
//       method: 'POST',
//       headers: {
//         ...reqHeaders,
//         // ...(contentType.includes('multipart/form-data')
//         //   ? {} // Let `fetch` handle the `Content-Type` for FormData
//         //   : { 'Content-Type': 'application/json' }),
//       },
//       body: contentType.includes('multipart/form-data')
//         ? reqBody
//         : JSON.stringify(reqBody),
//     };

//     // Perform the fetch request
//     const response = await fetch(sanitizedUrl, fetchOptions);

//     // Parse and log the response
//     const responseData = await response.json();
//     console.log('External API Response:', responseData);

//     // Return the response from the external API
//     return NextResponse.json(responseData, { status: response.status });
//   } catch (error: any) {
//     console.error('Error in generic proxy handler:', error.message);
//     return NextResponse.json(
//       {
//         error: 'Failed to proxy the external API call',
//         details: error.response?.data || error.message,
//       },
//       { status: error.response?.status || 500 },
//     );
//   }
// }

// axios instead of fetch
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    console.log('POST CALL...');

    // Extract the current route path and query parameters
    const url = new URL(req.url);
    const currentPath = url.pathname;

    // Build the external API URL and sanitize it
    const externalApiUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }${currentPath.replace('/api', '')}`.replace(/\/$/, '');
    console.log('ExternalApiURL:', externalApiUrl);

    let sanitizedUrl = externalApiUrl.replace(/\/$/, '');
    console.log(sanitizedUrl, 'SANITIZED URL POST');

    // Append query parameters if present
    const queryParams = url.searchParams.toString();
    if (queryParams) {
      sanitizedUrl += `?${queryParams}`;
    }
    //  sanitizedUrl = queryParams
    //   ? `${externalApiUrl}?${queryParams}`
    //   : externalApiUrl;
    console.log('ExternalApiURL with Params:', sanitizedUrl);

    // Parse the request body
    const contentType = req.headers.get('content-type') || '';
    let reqBody: any;

    console.log('CONTENT TYPE:', contentType);

    if (contentType.includes('application/json')) {
      reqBody = await req.json(); // JSON body
      console.log('JSON Request Body:', reqBody);
    } else if (contentType.includes('multipart/form-data')) {
      reqBody = await req.formData(); // FormData body
      console.log('FormData Request Body:', [...reqBody.entries()]); // Log FormData content
    } else {
      throw new Error('Unsupported Content-Type in request');
    }

    // Convert Next.js headers object into a plain object
    const reqHeaders: Record<string, string> = Object.fromEntries(
      req.headers.entries(),
    );
    console.log('Request Headers:', reqHeaders);

    // Ensure the externalApiUrl is valid
    if (!sanitizedUrl) {
      return NextResponse.json(
        { error: 'Missing externalApiUrl in the request body' },
        { status: 400 },
      );
    }

    // Set up Axios options
    const axiosOptions = {
      method: 'POST',
      url: sanitizedUrl,
      headers: {
        ...reqHeaders,
        'Content-Type': contentType, // Preserve the original content type
      },
      data: contentType.includes('multipart/form-data')
        ? (() => {
            const formData = new FormData();
            reqBody.forEach((value: any, key: string) => {
              formData.append(key, value);
            });
            return formData;
          })()
        : reqBody, // Use JSON or reconstructed FormData
    };

    // Perform the Axios request to the external API
    const response = await axios(axiosOptions);

    console.log('External API Response:', response.data);

    // Return the response from the external API
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Error in proxy handler:', error.message);

    // Handle Axios errors
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        Cookies.remove('jwt', { path: '/login' });
        Cookies.remove('username', { path: '/login' });
        Cookies.remove('browser_number', { path: '/login' });
      }
      return NextResponse.json(
        {
          error: 'Failed to proxy the external API call',
          details: error.response.data,
        },
        { status: error.response.status },
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: 'Failed to proxy the external API call',
        details: error.message,
      },
      { status: 500 },
    );
  }
}

// testing

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    console.log('GET CALL...');

    const apiSecret = req.cookies.get('browser_number')?.value;
    console.log('Extracted apiSecret', apiSecret);

    const jwt = req.cookies.get('jwt')?.value;
    console.log('Extracted JWT', jwt);

    const username = req.cookies.get('username')?.value;
    console.log('Extracted Username', username);

    const currentTimestamp = new Date().toISOString(); // Add timestamp
    console.log('Timestamp:', currentTimestamp);

    // Extract the current route path and query parameters
    const url = new URL(req.url);
    const currentPath = url.pathname;
    const sanitizedCurrentPath = currentPath.replace(/\/$/, '');
    // const queryParams = url.searchParams.toString();

    // Build the external API URL with optional query parameters
    const externalApiUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }${sanitizedCurrentPath.replace('/api', '')}`;

    console.log('ExternalApiURL:', externalApiUrl);

    // Convert Next.js headers object into a plain object
    const reqHeaders: Record<string, string> = Object.fromEntries(
      req.headers.entries(),
    );
    console.log('Request Headers:', reqHeaders);

    // Check if the externalApiUrl is valid
    if (!externalApiUrl) {
      return NextResponse.json(
        { error: 'Missing externalApiUrl in the request body' },
        { status: 400 },
      );
    }

    const sanitizedUrl = externalApiUrl.replace(/\/$/, '');

    console.log(sanitizedUrl, 'SANITIZED GET');

    // generate md5HAsh
    const mdRequest = {
      currentTimestamp,
      apiSecret,
      username,
    };

    const md5Hash = generateMD5Hash(mdRequest);

    // Set up Axios options for the GET request
    const response = await axios({
      method: 'GET',
      url: sanitizedUrl,
      headers: {
        ...reqHeaders,
        Authorization: `Bearer ${jwt}`,
      },
      params: {
        signature: md5Hash,
        username,
        timestamp: currentTimestamp,
        ...Object.fromEntries(url.searchParams.entries()),
      },
    });

    console.log('External API Response:', response.data);

    // Return the response from the external API
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Error in generic proxy handler:', error.message);

    // Handle Axios errors
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          error: 'Failed to proxy the external API call',
          details: error.response.data,
        },
        { status: error.response.status },
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: 'Failed to proxy the external API call',
        details: error.message,
      },
      { status: 500 },
    );
  }
}

// working fetch without signature

// export async function POST(req: NextRequest): Promise<NextResponse> {
//   try {
//     console.log('POST CALL...');

//     // Extract the current route path and query parameters
//     const url = new URL(req.url);
//     const currentPath = url.pathname;

//     // Build the external API URL and sanitize it
//     const externalApiUrl = `${
//       process.env.NEXT_PUBLIC_BASE_URL
//     }${currentPath.replace('/api', '')}`.replace(/\/$/, '');
//     console.log('ExternalApiURL:', externalApiUrl);

//     // Append query parameters if present
//     const queryParams = url.searchParams.toString();
//     const sanitizedUrl = queryParams
//       ? `${externalApiUrl}?${queryParams}`
//       : externalApiUrl;
//     console.log('ExternalApiURL with Params:', sanitizedUrl);

//     // Parse the request body
//     const contentType = req.headers.get('content-type') || '';
//     let reqBody: any;

//     console.log('CONTENT TYPEEEE:', contentType);

//     if (contentType.includes('application/json')) {
//       reqBody = await req.json(); // JSON body
//       console.log('JSON Request Body:', reqBody);
//     } else if (contentType.includes('multipart/form-data')) {
//       reqBody = await req.formData(); // FormData body
//       console.log('FormData Request Body:', [...reqBody.entries()]); // Log FormData content
//     } else {
//       throw new Error('Unsupported Content-Type in request');
//     }

//     // Convert Next.js headers object into a plain object
//     const reqHeaders: Record<string, string> = Object.fromEntries(
//       req.headers.entries(),
//     );
//     console.log('Request Headers:', reqHeaders);

//     // Check if the externalApiUrl is valid
//     if (!sanitizedUrl) {
//       return NextResponse.json(
//         { error: 'Missing externalApiUrl in the request body' },
//         { status: 400 },
//       );
//     }

//     // Set up fetch options, including headers and body
//     const fetchOptions: RequestInit = {
//       method: 'POST',
//       headers: {
//         ...reqHeaders,
//         // Let fetch handle multipart/form-data headers
//         // 'content-length': undefined, // Remove content-length (automatically recalculated)
//       },
//       body: contentType.includes('multipart/form-data')
//         ? reqBody // FormData directly for multipart
//         : JSON.stringify(reqBody), // Stringify JSON body
//     };

//     // Perform the fetch request to the external API
//     const response = await fetch(sanitizedUrl, fetchOptions);

//     // Parse and log the external API response
//     const responseData = await response.json();
//     console.log('External API Response:', responseData);

//     // Return the response from the external API
//     return NextResponse.json(responseData, { status: response.status });
//   } catch (error: any) {
//     console.error('Error in generic proxy handler:', error.message);
//     return NextResponse.json(
//       {
//         error: 'Failed to proxy the external API call',
//         details: error.message,
//       },
//       { status: 500 },
//     );
//   }
// }

// old with unique key files
// export async function POST(req: NextRequest): Promise<NextResponse> {
//   try {
//     // Extract the current route path
//     const currentPath = new URL(req.url).pathname;

//     // Build the external API URL
//     const externalApiUrl = `${
//       process.env.NEXT_PUBLIC_BASE_URL
//     }${currentPath.replace('/api', '')}`;
//     console.log('ExternalApiURL:', externalApiUrl);

//     // Parse the content type
//     const contentType = req.headers.get('content-type') || '';
//     let reqBody: any;

//     if (contentType.includes('application/json')) {
//       reqBody = await req.json();
//     } else if (contentType.includes('multipart/form-data')) {
//       reqBody = await req.formData();

//       // Ensure no duplicate keys in the FormData object
//       const uniqueKeys = new Set<string>();
//       const sanitizedFormData = new FormData();
//       for (const [key, value] of reqBody.entries()) {
//         if (!uniqueKeys.has(key)) {
//           sanitizedFormData.append(key, value);
//           uniqueKeys.add(key);
//         } else {
//           console.warn(`Duplicate key "${key}" detected and skipped.`);
//         }
//       }
//       reqBody = sanitizedFormData;
//     } else {
//       throw new Error('Unsupported Content-Type in request');
//     }

//     // Convert headers to a plain object
//     const reqHeaders: Record<string, string> = Object.fromEntries(
//       req.headers.entries(),
//     );

//     // Check if the externalApiUrl is valid
//     if (!externalApiUrl) {
//       return NextResponse.json(
//         { error: 'Missing externalApiUrl in the request body' },
//         { status: 400 },
//       );
//     }

//     const sanitizedUrl = externalApiUrl.replace(/\/$/, '');
//     console.log('Sanitized URL:', sanitizedUrl);

//     // Prepare fetch options
//     const fetchOptions: RequestInit = {
//       method: 'POST',
//       headers: {
//         ...reqHeaders,
//         // ...(contentType.includes('multipart/form-data')
//         //   ? {} // Let `fetch` set the `Content-Type` for FormData
//         //   : { 'Content-Type': 'application/json' }),
//       },
//       body: contentType.includes('multipart/form-data')
//         ? reqBody
//         : JSON.stringify(reqBody),
//     };

//     // Perform the external API call
//     const response = await fetch(sanitizedUrl, fetchOptions);
//     console.log('External API Response before json:', response);
//     // Return the response from the external API
//     const responseData = await response.json();
//     console.log('External API Response:', responseData);
//     return NextResponse.json(responseData, { status: response.status });
//   } catch (error: any) {
//     console.error('Error in generic proxy handler:', error.message);
//     return NextResponse.json(
//       {
//         error: 'Failed to proxy the external API call',
//         details: error.message,
//       },
//       { status: 500 },
//     );
//   }
// }

// export async function GET(req: NextRequest): Promise<NextResponse> {
//   try {
//     console.log('GET CALL...');

//     const currentTimestamp = new Date().toISOString();
//     console.log('Currenttimestamp', currentTimestamp);

//     const apiSecret =  req.cookies.get('browser_number')?.value;
//     console.log('Extracted apiSecret', apiSecret);
//     const jwt = req.cookies.get('jwt')?.value;
//     console.log('Extracted JWT', jwt);

//     // Extract the current route path and query parameters
//     const url = new URL(req.url);
//     const currentPath = url.pathname;
//     const sanitizedCurrentPath = currentPath.replace(/\/$/, '');
//     const queryParams = url.searchParams.toString();

//     // Build the external API URL with optional query parameters
//     const externalApiUrl = `${
//       process.env.NEXT_PUBLIC_BASE_URL
//     }${sanitizedCurrentPath.replace('/api', '')}${
//       queryParams ? `?${queryParams}` : ''
//     }`;

//     console.log('ExternalApiURL:', externalApiUrl);

//     // Convert Next.js headers object into a plain object
//     const reqHeaders: Record<string, string> = Object.fromEntries(
//       req.headers.entries(),
//     );
//     console.log('Request Headers:', reqHeaders);

//     // Check if the externalApiUrl is valid
//     if (!externalApiUrl) {
//       return NextResponse.json(
//         { error: 'Missing externalApiUrl in the request body' },
//         { status: 400 },
//       );
//     }

//     const sanitizedUrl = externalApiUrl.replace(/\/$/, '');

//     console.log(sanitizedUrl, 'SANITIZED GET');

//     // Perform the GET request
//     const response = await fetch(sanitizedUrl, {
//       method: 'GET',
//       headers: {
//         ...reqHeaders,
//       },

//     });

//     const responseData = await response.json();

//     // Log the response from the external API
//     console.log('External API Response:', responseData);

//     // Return the response from the external API
//     return NextResponse.json(responseData, { status: response.status });
//   } catch (error: any) {
//     console.error('Error in generic proxy handler:', error.message);
//     return NextResponse.json(
//       {
//         error: 'Failed to proxy the external API call',
//         details: error.response?.data || error.message,
//       },
//       { status: error.response?.status || 500 },
//     );
//   }
// }
