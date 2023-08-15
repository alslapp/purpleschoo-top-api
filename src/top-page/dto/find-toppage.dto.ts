import { IsEnum } from 'class-validator';
import { TopLevelCategoryEnum } from './top-lavel-category.enum';
export class FindTopPageDto {
	@IsEnum(TopLevelCategoryEnum)
	firstCategory: TopLevelCategoryEnum;
}
