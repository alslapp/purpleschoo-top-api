import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
	HttpStatus,
	HttpCode,
	BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, FindProductDto, UpdateProductDto } from './dto';
import { PRODUCT_EXISTS_ERROR, PRODUCT_NOT_FOUND_ERROR } from './product.constanst';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	async create(@Body() dto: CreateProductDto) {
		const prod = await this.productService.findOne({ title: dto.title });
		if (prod) {
			throw new BadRequestException(PRODUCT_EXISTS_ERROR);
		}
		return this.productService.create(dto);
	}

	@Get(':id')
	async findById(@Param('id', IdValidationPipe) id: string) {
		const prod = await this.productService.findById(id);
		if (!prod) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return prod;
	}

	@Delete(':id')
	async deleteById(@Param('id', IdValidationPipe) id: string) {
		const prod = await this.productService.findById(id);
		if (!prod) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return this.productService.deleteById(id);
	}

	@Patch(':id')
	async updateById(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdateProductDto) {
		const prod = await this.productService.updateById(id, dto);
		if (!prod) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return prod;
	}

	@Get()
	findAll() {
		return this.productService.findAll();
	}

	@HttpCode(HttpStatus.OK)
	@Post('find')
	find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}
}
