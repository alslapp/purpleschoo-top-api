import {
	IsArray,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductCharacteristicDto {
	@IsString()
	name: string;

	@IsString()
	value: string;
}

export class CreateProductDto {
	@IsString()
	image: string;

	@IsString()
	@IsNotEmpty()
	title: string;

	@IsNumber()
	@Type(() => Number)
	@IsNotEmpty()
	price: number;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	oldPrice?: number;

	@IsInt()
	@Type(() => Number)
	credit: number;

	@IsString()
	description: string;

	@IsString()
	advantages: string;

	@IsString()
	disAdvantages: string;

	@IsArray()
	@IsString({ each: true })
	categories: string[];

	@IsArray()
	@IsString({ each: true })
	tags: string[];

	@IsArray()
	@ValidateNested()
	@Type(() => ProductCharacteristicDto)
	characteristics: ProductCharacteristicDto[];
}
