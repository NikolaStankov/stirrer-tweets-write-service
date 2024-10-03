import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Tweet } from './tweets/entities/tweet.entity';
import { TweetsModule } from './tweets/tweets.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('WRITE_TW_DB_HOST'),
        port: +configService.get('WRITE_TW_DB_PORT'),
        username: configService.get('WRITE_TW_DB_USERNAME'),
        password: configService.get('WRITE_TW_DB_PASSWORD'),
        database: configService.get('WRITE_TW_DB_NAME'),
        entities: [Tweet],
        synchronize: true, //Set to false in production
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: 'TWEET_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'tweets_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    TweetsModule,
  ],
})
export class AppModule {}
