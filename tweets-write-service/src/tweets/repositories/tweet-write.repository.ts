import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tweet } from '../entities/tweet.entity';

@Injectable()
export class TweetWriteRepository extends Repository<Tweet> {
  constructor(private dataSource: DataSource) {
    super(Tweet, dataSource.createEntityManager());
  }
}
