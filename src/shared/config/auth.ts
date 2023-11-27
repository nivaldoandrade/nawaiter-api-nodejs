import { env } from './env';

export default {
  jwt: {
    secret: env.jwtSecret,
    expiresIn: '1d',
  },
};
