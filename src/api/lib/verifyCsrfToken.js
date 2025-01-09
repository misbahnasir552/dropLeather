import * as CSRF from 'csrf';

const csrfProtection = new CSRF();

function verifyCsrfToken(req) {
  const secret = req.cookies['csrf-secret']; // Retrieve the secret from the cookie
  const token = req.headers['x-csrf-token']; // Retrieve the token from the request header

  if (!secret || !token || !csrfProtection.verify(secret, token)) {
    throw new Error('Invalid CSRF token');
  }
}

export default verifyCsrfToken;
