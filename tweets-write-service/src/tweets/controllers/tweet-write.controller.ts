import { Body, Controller, Post, UseGuards, Logger } from '@nestjs/common';
import { TweetWriteService } from '../services/tweet-write.service';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { Tweet } from '../entities/tweet.entity';
import { GatewayGuard } from '../guards/gateway.guard';

@Controller('tweets')
@UseGuards(GatewayGuard)
export class TweetWriteController {
  private readonly logger = new Logger(TweetWriteController.name);

  constructor(private readonly tweetWriteService: TweetWriteService) {}

  @Post()
  async create(@Body() createTweetDto: CreateTweetDto): Promise<Tweet> {
    this.logger.log(
      `Received request to create tweet: ${JSON.stringify(createTweetDto)}`,
    );

    try {
      const result = await this.tweetWriteService.create(createTweetDto);
      this.logger.log(`Tweet created successfully: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error creating tweet: ${error.message}`);
    }
  }
}
