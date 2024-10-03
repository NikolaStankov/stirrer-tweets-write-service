import { Body, Controller, Post } from '@nestjs/common';
import { TweetWriteService } from '../services/tweet-write.service';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { Tweet } from '../entities/tweet.entity';

@Controller('tweets')
export class TweetWriteController {
  constructor(private readonly tweetWriteService: TweetWriteService) {}

  @Post()
  async create(@Body() createTweetDto: CreateTweetDto): Promise<Tweet> {
    return await this.tweetWriteService.create(createTweetDto);
  }
}
