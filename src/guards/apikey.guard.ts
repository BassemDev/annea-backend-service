import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ApikeyGuard extends AuthGuard('headerapikey') {}
