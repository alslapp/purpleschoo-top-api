import { PartialType } from '@nestjs/mapped-types';
import { ReviewDto } from './review.dto';
export class CreateReviewDto extends PartialType(ReviewDto) {}
