import {
	IsNotEmpty,
	IsString,
	IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

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

	@IsInt()
	@Type(() => Number)
	rating: number;

	@IsString()
	@IsNotEmpty()
	productId: string;

	@IsString()
	createdAt: Date;

	@IsString()
	updatedAt: Date;
}
