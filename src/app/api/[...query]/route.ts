import axios from 'axios';
import Cookies from 'js-cookie';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { generateMD5Hash } from '@/utils/helper';

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
