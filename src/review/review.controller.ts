import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { CreateReviewDto } from './dto';
import { ReviewService } from './review.service';
import {REVIEW_NOT_FOUND, REVIEWS_BY_PRODUCT_ID_NOT_FOUND} from './review.constants';

@Controller('review')
export class ReviewController {
	constructor(private reviewService: ReviewService) {}

	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Get()
	async getAll() {
		return this.reviewService.getAll();
	}

	@Get(':id')
	getById(@Param('id') id: string) {
		return this.reviewService.getById(id);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const res = await this.reviewService.deleteById(id);
		if (!res?.deletedCount) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byProduct/:productId')
	getByProductId(@Param('productId') productId: string) {
		return this.reviewService.getByProductId(productId);

	}

	@Delete('deleteByProductId/:ProductId')
	async deleteByProductId(@Param('ProductId') ProductId: string) {
		const res = await this.reviewService.deleteByProductId(ProductId);

		if (!res?.deletedCount) {
			throw new HttpException(REVIEWS_BY_PRODUCT_ID_NOT_FOUND, HttpStatus.NOT_FOUND);
		}

		return res;
	}
}
