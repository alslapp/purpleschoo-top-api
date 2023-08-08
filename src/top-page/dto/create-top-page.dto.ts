import { TopPageDto } from './top-page.dto';

export type TopPageCreateDto = Pick<
	TopPageDto,
	| 'firstCategory'
	| 'secondCategory'
	| 'title'
	| 'seoText'
	| 'tagsTitle'
	| 'tags'
>;
