import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const secretKey = '+a4sasd4a65d4sa65d4a65d4sa6d54asd654d+ad4'; // Cambia esto por una clave secreta fuerte

export const generateToken = (payload) => {
  const tokenPayload = {
    ...payload,
    random: crypto.randomBytes(16).toString('hex')
  }
  return jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
};
