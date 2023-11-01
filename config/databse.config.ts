import { registerAs } from '@nestjs/config';

import { ConfigRegistrationKey } from './types';

export const datbaseConfigFactory = registerAs(
  ConfigRegistrationKey.DB,
  () => ({
    name: process.env.DATABASE_NAME || test,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '', 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  }),
);
