import { IsArray, IsString } from 'class-validator';

export enum TopLevelCategory {
	Cources,
	Services,
	Books,
	Products,
}

type THh = {
	count: number;
	juniorSalary: number;
	middleSalary: number;
	seniorSalary: number;
};

type TAdvantages = {
	title: string;
	description: string;
};

export class TopPageDto {
	@IsString()
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	title: string;

	hh?: THh;

	@IsArray()
	advantages: TAdvantages[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	tags: string[];
}
