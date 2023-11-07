import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'TOKEN.apiToken') {
                return 'validAPiKey';
              }
              return '';
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return FALSE for wrong api token', () => {
    // Arrange
    const falseApiKey = 'wrongAPiKey';

    // Act
    const result = service.validateApiKey(falseApiKey);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return TRUE for valid api token', () => {
    // Arrange
    const validApiKey = 'validAPiKey';

    // Act
    const result = service.validateApiKey(validApiKey);

    // Assert
    expect(result).toBeTruthy();
  });
});
