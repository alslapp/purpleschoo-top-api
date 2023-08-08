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
import { ReviewCreateDto } from './dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND, REVIEWS_BY_PRODUCT_ID_NOT_FOUND } from './review.constants'

@Controller('review')
export class ReviewController {
	constructor(
		private reviewService: ReviewService,
	) {}

	@Post()
	async create(@Body() dto: ReviewCreateDto) {
		return this.reviewService.create(dto);
	}

	@Get()
	async getAll() {
		return this.reviewService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		const res = await this.reviewService.getById(
			id,
		);
		if (!res.length) {
			throw new HttpException(
				REVIEW_NOT_FOUND,
				HttpStatus.NOT_FOUND,
			);
		}
		return res;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const res =
			await this.reviewService.deleteById(id);

		if (!res?.deletedCount) {
			throw new HttpException(
				REVIEW_NOT_FOUND,
				HttpStatus.NOT_FOUND,
			);
		}

		return res;
	}

	@Delete('deleteByProductId/:ProductId')
	async deleteByProductId(
		@Param('ProductId') ProductId: string,
	) {
		const res =
			await this.reviewService.deleteByProductId(
				ProductId,
			);

		if (!res?.deletedCount) {
			throw new HttpException(
				REVIEWS_BY_PRODUCT_ID_NOT_FOUND,
				HttpStatus.NOT_FOUND,
			);
		}

		return res;
	}

	@Get('byProduct/:productId')
	getByProductId(
		@Param('productId') productId: string,
	) {
		return this.reviewService.getByProductId(
			productId,
		);
	}
}
