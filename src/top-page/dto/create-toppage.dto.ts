import {IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';
import { TopLevelCategoryEnum } from './top-lavel-category.enum';

class TopPageHHDto {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

class TopPageAdvantagesDto {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategoryEnum)
	firstCategory: TopLevelCategoryEnum;

	@IsString()
	secondCategory: string;

	@IsString()
	title: string;

	@IsString()
	alias: string;

	@IsOptional()
	@IsArray()
	@ValidateNested()
	@Type(() => TopPageHHDto)
	hh: TopPageHHDto[];

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantagesDto)
	advantages: TopPageAdvantagesDto[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	tags: string[];
}
