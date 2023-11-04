// External Module import
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

// Internal auth module import
import { AuthService } from './auth.service';
import { ApiKeyStrategy } from '../strategies/apiToken.strategy';
import { ApikeyGuard } from '../guards/apikey.guard';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [AuthService, ApiKeyStrategy, ApikeyGuard],
})
export class AuthModule {}
