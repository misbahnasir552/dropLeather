import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Extract the current route path
    const currentPath = new URL(req.url).pathname;

    // Build the external API URL
    const externalApiUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }${currentPath.replace('/api', '')}`;
    console.log('ExternalApiURL:', externalApiUrl);

    // Parse the content type
    const contentType = req.headers.get('content-type') || '';
    let reqBody: any;

    if (contentType.includes('application/json')) {
      reqBody = await req.json();
    } else if (contentType.includes('multipart/form-data')) {
      reqBody = await req.formData();

      // Ensure no duplicate keys in the FormData object
      const uniqueKeys = new Set<string>();
      const sanitizedFormData = new FormData();
      for (const [key, value] of reqBody.entries()) {
        if (!uniqueKeys.has(key)) {
          sanitizedFormData.append(key, value);
          uniqueKeys.add(key);
        } else {
          console.warn(`Duplicate key "${key}" detected and skipped.`);
        }
      }
      reqBody = sanitizedFormData;
    } else {
      throw new Error('Unsupported Content-Type in request');
    }

    // Convert headers to a plain object
    const reqHeaders: Record<string, string> = Object.fromEntries(
      req.headers.entries(),
    );

    // Check if the externalApiUrl is valid
    if (!externalApiUrl) {
      return NextResponse.json(
        { error: 'Missing externalApiUrl in the request body' },
        { status: 400 },
      );
    }

    const sanitizedUrl = externalApiUrl.replace(/\/$/, '');
    console.log('Sanitized URL:', sanitizedUrl);

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        ...reqHeaders,
        ...(contentType.includes('multipart/form-data')
          ? {} // Let `fetch` set the `Content-Type` for FormData
          : { 'Content-Type': 'application/json' }),
      },
      body: contentType.includes('multipart/form-data')
        ? reqBody
        : JSON.stringify(reqBody),
    };

    // Perform the external API call
    const response = await fetch(sanitizedUrl, fetchOptions);

    // Return the response from the external API
    const responseData = await response.json();
    console.log('External API Response:', responseData);
    return NextResponse.json(responseData, { status: response.status });
  } catch (error: any) {
    console.error('Error in generic proxy handler:', error.message);
    return NextResponse.json(
      {
        error: 'Failed to proxy the external API call',
        details: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const externalApiUrl = searchParams.get('externalApiUrl');
    const email = searchParams.get('email'); // Example query param

    if (!externalApiUrl) {
      return NextResponse.json(
        { error: 'Missing externalApiUrl in query parameters' },
        { status: 400 },
      );
    }

    console.log(`Proxying GET request to: ${externalApiUrl}`);

    // Add headers for the external request
    const preHeaders = {
      'Content-Type': 'application/json',
    };

    // Perform the external API call
    const response = await fetch(`${externalApiUrl}?email=${email}`, {
      method: 'GET',
      headers: preHeaders,
    });

    // Ensure only the required response payload is returned
    const responseData = await response.json();

    return NextResponse.json(responseData, { status: response.status });
  } catch (error) {
    console.error('Error in GET proxy handler:', error);
    return NextResponse.json(
      { error: 'Failed to proxy the external API call' },
      { status: 500 },
    );
  }
}
