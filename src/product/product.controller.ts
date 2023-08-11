import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dto';

@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Post()
	async create(@Body() dto: ProductCreateDto) {
		return await this.productService.create(dto);
	}

	@Get()
	async getAll() {
		return await this.productService.getAll();
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		return { msg: 'success', id };
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return { msg: 'success', id };
	}

	@Patch(':id')
	async patch(@Param('id') id: string) {
		return { msg: 'success', id };
	}

	@HttpCode(HttpStatus.OK)
	@Post()
	async find(@Param('id') id: string) {
		return { msg: 'success', id };
	}
}
