import dotenv from 'dotenv';
dotenv.config();

import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export const createTokenJwt = (id: string) => {
  const token = jwt.sign({ id }, secret, {
    expiresIn: '30m',
  });
  return token;
};

export const verifyTokenJwt = (token: string) => {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      throw new Error(err.message);
    }
    const payload = decoded as JwtPayload;
    return payload.id;
  });
};
