// NPM dependencies imports
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Interal imports
import { IndicatorsModule } from './indicators/indicators.module';
import { appConfigFactory } from '../config/app.config';
import { datbaseConfigFactory } from '../config/databse.config';
import { validateConfig } from '../config/validation';
import { DBType } from '../config/types';

@Module({
  imports: [
    // Configuration of Graphql playground
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    // Configuration environment variable for DB and third parties or API keys
    ConfigModule.forRoot({
      load: [appConfigFactory, datbaseConfigFactory],
      validate: validateConfig,
      envFilePath: '.development.env',
    }),
    // Configuration of DB and connection to instance
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: DBType.POSTEGRES,
          host: configService.get<string>('DB.host'),
          port: configService.get<number>('DB.port'),
          username: configService.get<string>('DB.username'),
          password: configService.get<string>('DB.password'),
          database: configService.get<string>('DB.name'),
          entities: [__dirname + '/**/**/**.entity{.ts,.js}'],
          synchronize: false,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
      inject: [ConfigService],
    }),
    IndicatorsModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
