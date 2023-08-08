import { ReviewDto } from './review.dto';

export type ReviewCreateDto = Pick<
	ReviewDto,
	'name' | 'title' | 'description' | 'productId'
>;
