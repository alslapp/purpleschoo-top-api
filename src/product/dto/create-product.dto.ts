import { ProductDto } from './product.dto';

export type ProductCreateDto = Pick<
	ProductDto,
	'image' | 'title' | 'price' | 'oldPrice' | 'description' | 'categories' | 'tags'
>;
