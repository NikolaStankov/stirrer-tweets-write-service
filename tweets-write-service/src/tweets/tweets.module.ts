import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetWriteController } from './controllers/tweet-write.controller';
import { TweetWriteService } from './services/tweet-write.service';
import { TweetWriteRepository } from './repositories/tweet-write.repository';
import { Tweet } from './entities/tweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  controllers: [TweetWriteController],
  providers: [TweetWriteService, TweetWriteRepository],
})
export class TweetsModule {}
