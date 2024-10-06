import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TweetWriteController } from './controllers/tweet-write.controller';
import { TweetWriteService } from './services/tweet-write.service';
import { TweetWriteRepository } from './repositories/tweet-write.repository';
import { Tweet } from './entities/tweet.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tweet]),
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
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TweetWriteController],
  providers: [TweetWriteService, TweetWriteRepository],
})
export class TweetsModule {}
