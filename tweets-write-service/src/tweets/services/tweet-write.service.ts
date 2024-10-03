import { Inject, Injectable } from '@nestjs/common';
import { TweetWriteRepository } from '../repositories/tweet-write.repository';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { Tweet } from '../entities/tweet.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TweetWriteService {
  constructor(
    private tweetWriteRepository: TweetWriteRepository,
    @Inject('TWEET_SERVICE') private client: ClientProxy,
  ) {}

  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    const tweet = this.tweetWriteRepository.create(createTweetDto);
    await this.tweetWriteRepository.save(tweet);
    this.client.emit('tweet_created', tweet);
    return tweet;
  }
}
