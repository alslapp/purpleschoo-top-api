import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND, REVIEWS_BY_PRODUCT_ID_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/gards';
import { userEmail } from '../decorators';
import {IdValidationPipe} from "../pipes/id-validation.pipe";

@Controller('review')
export class ReviewController {
	constructor(private reviewService: ReviewService) {}

	@UsePipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		}),
	)
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Get()
	async getAll() {
		return this.reviewService.getAll();
	}

	@Get(':id')
	getById(@Param('id', IdValidationPipe) id: string) {
		return this.reviewService.getById(id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const res = await this.reviewService.deleteById(id);
		if (!res?.deletedCount) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byProduct/:productId')
	getByProductId(@Param('productId', IdValidationPipe) productId: string) {
		return this.reviewService.getByProductId(productId);
	}

	@UseGuards(JwtAuthGuard)
	async deleteByProductId(@Param('ProductId', IdValidationPipe) ProductId: string) {
		const res = await this.reviewService.deleteByProductId(ProductId);
		if (!res?.deletedCount) {
			throw new HttpException(REVIEWS_BY_PRODUCT_ID_NOT_FOUND, HttpStatus.NOT_FOUND);
		}

		return res;
	}
}
