import { registerAs } from '@nestjs/config';

import { ConfigRegistrationKey } from './types';

export const tokenConfigFactory = registerAs(
  ConfigRegistrationKey.TOKEN,
  () => ({
    apiToken: process.env.API_TOKEN || '',
  }),
);
