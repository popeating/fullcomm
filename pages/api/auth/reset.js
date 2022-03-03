import axios from '../../../lib/api';
export default async (req, res) => {
  if (req.method === 'POST') {
    var resp = {};
    resp = await axios
      .post('/api/auth/reset-password', req.body)
      .then((response) => {
        return res.status(200).json({ message: response.data.user });
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
