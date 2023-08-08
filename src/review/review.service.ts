import { Injectable } from '@nestjs/common';
import { ReviewCreateDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './models';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review.name)
		private reviewModel: Model<ReviewDocument>,
	) {}

	create(dto: ReviewCreateDto) {
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
		return this.reviewModel.find({ productId });
	}

	getById(_id: string) {
		return this.reviewModel.find({ _id });
	}
}
