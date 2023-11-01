import { registerAs } from '@nestjs/config';

import { ConfigRegistrationKey } from './types';

export const appConfigFactory = registerAs(ConfigRegistrationKey.APP, () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '', 10) || 3000,
  appName: process.env.APP_NAME,
}));
