import axios from '../../../lib/api';
import cookie from 'cookie';
export default async (req, res) => {
  if (req.method === 'POST') {
    var resp = {};
    resp = await axios
      .post('/api/auth/local', req.body)
      .then((response) => {
        const jwt = response.data.jwt;
        const id = response.data.user.id;

        res
          .setHeader('Set-Cookie', [
            cookie.serialize('token', jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              maxAge: 60 * 60 * 24 * 7, // 1 week
              sameSite: 'strict',
              path: '/',
            }),
            cookie.serialize('userid', id, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              maxAge: 60 * 60 * 24 * 7, // 1 week
              sameSite: 'strict',
              path: '/',
            }),
          ])
          .json({ message: response.data.user });
      })
      .catch((error) => {
        if (!error.response.data.error.message) {
          return res.status(500).json({ message: 'Internal server error' });
        } else {
          const messages = error.response.data.error.message;
          return res.status(403).json({ message: messages });
        }
      });
  }
};
