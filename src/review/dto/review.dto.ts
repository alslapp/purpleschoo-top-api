import { IsNotEmpty, IsString, IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {REVIEWS_VALIDATION_ERROR_RATING_TOO_GREAT, REVIEWS_VALIDATION_ERROR_RATING_TOO_LESS} from "../review.constants";

export class ReviewDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@Max(5, { message: REVIEWS_VALIDATION_ERROR_RATING_TOO_GREAT })
	@Min(1, { message: REVIEWS_VALIDATION_ERROR_RATING_TOO_LESS })
	@IsInt()
	@Type(() => Number)
	rating: number;

	@IsString()
	@IsNotEmpty()
	productId: string;
}
