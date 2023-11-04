import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  validateApiKey(apiKey: string) {
    return apiKey === this.configService.get<string>('TOKEN.apiToken');
  }
}
