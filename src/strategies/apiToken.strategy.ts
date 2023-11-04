import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  // Logger used for debug and error reporting
  private readonly logger = new Logger(ApiKeyStrategy.name);

  constructor(private authService: AuthService) {
    super(
      { header: 'Authorization', prefix: 'ApiKey' },
      true,
      (apikey: string, done: (t: boolean) => void) => {
        const checkKey = this.authService.validateApiKey(apikey);

        if (!checkKey) {
          this.logger.warn('API Token provided in header is not Valid.');
          return done(false);
        }

        return done(true);
      },
    );
  }
}
