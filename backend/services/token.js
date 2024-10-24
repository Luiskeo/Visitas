import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const secretKey = '987987987987987987987987'; 

export const generateToken = (payload) => {
  const tokenPayload = {
    ...payload,
    random: crypto.randomBytes(16).toString('hex')
  }
  return jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
};
