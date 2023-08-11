import { IsArray, IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
	@IsString()
	image: string;

	@IsString()
	@IsNotEmpty()
	title: string;

	@IsInt()
	@Type(() => Number)
	@IsNotEmpty()
	price: number;

	@IsInt()
	@Type(() => Number)
	oldPrice: number;

	@IsInt()
	@Type(() => Number)
	credit: number;

	@IsInt()
	@Type(() => Number)
	calculatedRating: number;

	@IsString()
	description: string;

	@IsString()
	advantages: string;

	@IsString()
	disAdvantages: string;

	@IsArray()
	categories: string[];

	@IsString()
	tags: string;

	@IsArray()
	characteristics: {
		[key: string]: string;
	};

	@IsString()
	createdAt: Date;

	@IsString()
	updatedAt: Date;
}
