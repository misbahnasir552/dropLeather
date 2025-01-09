import verifyCsrfToken from './lib/verifyCsrfToken';

export default function handler(req, res) {
  try {
    verifyCsrfToken(req);

    // Process the request
    res.status(200).json({ message: 'CSRF token validated successfully!' });
  } catch (error) {
    res.status(403).json({ error: 'Invalid CSRF token' });
  }
}
