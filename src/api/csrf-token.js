import * as CSRF from 'csrf';

const csrfProtection = new CSRF();

export default function handler(req, res) {
  const secret = process.env.CSRF_SECRET || csrfProtection.secretSync(); // Use a secure, persisted secret
  const token = csrfProtection.create(secret);

  // Save the secret in the session or secure storage for validation later
  // (in production, you might use a secure session store like Redis)
  res.setHeader(
    'Set-Cookie',
    `csrf-secret=${secret}; HttpOnly; Secure; Path=/; SameSite=Strict`,
  );

  res.status(200).json({ csrfToken: token });
}
