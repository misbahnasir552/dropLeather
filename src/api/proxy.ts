import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { method, body } = req;

  // Define the target backend URL
  const backendURL = `${process.env.NEXT_PUBLIC_BASE_URL}${req.url?.replace(
    '/api/proxy',
    '',
  )}`;

  console.log('Proxy is running for URL:', backendURL);

  try {
    // Sanitize headers to match the HeadersInit type
    const csrf = await fetch('/api/csrf-token')
      .then((res) => res.json())
      .then((data) => data.csrfToken);
    const sanitizedHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        sanitizedHeaders[key] = value.join(', '); // Combine array values into a single string
      } else if (typeof value === 'string') {
        sanitizedHeaders[key] = value;
      }
    }
    console.log(csrf, 'CSRF TOKEN');

    // Add Content-Type to the headers
    sanitizedHeaders['Content-Type'] = 'application/json';
    sanitizedHeaders['X-CSRF-Token'] = csrf;

    const response = await fetch(backendURL, {
      method,
      headers: sanitizedHeaders,
      body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
