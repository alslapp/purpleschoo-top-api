import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './models';
import { REVIEW_NOT_FOUND } from './review.constants';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review.name)
		private reviewModel: Model<ReviewDocument>,
	) {}

	create(dto: CreateReviewDto) {
		const newReview = new this.reviewModel(dto);
		return newReview.save();
	}

	getAll() {
		return this.reviewModel.find();
	}

	deleteById(_id: string) {
		return this.reviewModel.deleteOne({ _id });
	}

	deleteByProductId(productId: string) {
		return this.reviewModel.deleteMany({ productId });
	}

	getByProductId(productId: string) {
		return this.reviewModel.find({ productId }).exec();
	}

	async getById(id: string) {
		const res = await this.reviewModel.findById(id);
		if (!res) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return res;
	}
}
