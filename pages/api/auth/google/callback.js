import axios from '../../../../lib/api';
import cookie from 'cookie';

export default async (req, res) => {
  if (req.method === 'POST') {
    await axios
      .get(`/api/auth/google/callback?access_token=${req.body.access_token}`)
      .then((response) => {
        const jwt = response.data.jwt;
        const id = response.data.user.id;
        res.setHeader('Set-Cookie', [
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
        ]);
        return res.status(200).json({ message: response.data.user });
      })
      .catch((error) => {
        res.status(405).json({ message: error });
      });
  }
};
