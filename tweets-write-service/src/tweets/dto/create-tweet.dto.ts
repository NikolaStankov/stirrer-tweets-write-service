import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  content: string;
}
