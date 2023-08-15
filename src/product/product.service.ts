import { Injectable } from '@nestjs/common';
import { CreateProductDto, FindProductDto, UpdateProductDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './models';
import { Model } from 'mongoose';
import { ReviewDocument } from '../review/models';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name)
		private productModel: Model<ProductDocument>,
	) {}

	create(dto: CreateProductDto) {
		const prodNew = new this.productModel(dto);
		return prodNew.save();
	}

	async findById(id: string) {
		return this.productModel.findById(id);
	}

	findOne(filter: UpdateProductDto) {
		return this.productModel.findOne(filter);
	}

	deleteById(_id: string) {
		return this.productModel.deleteOne({ _id });
	}

	updateById(_id: string, data: UpdateProductDto) {
		return this.productModel.findOneAndUpdate({ _id }, data, { new: true });
	}

	findAll() {
		return this.productModel.find();
	}

	async findWithReviews(dto: FindProductDto) {
		return (await this.productModel
			.aggregate([
				{
					$match: {
						categories: dto.category,
					},
				},
				{
					// стабильная сортировка по _id,
					// т.к. могут выдаваться разные результаты
					// при каждом запросе
					$sort: {
						_id: 1,
					},
				},
				{
					$limit: dto.limit,
				},
				// подключаем другую таблицу
				{
					$lookup: {
						from: 'reviews',
						localField: '_id',
						foreignField: 'productId',
						as: 'reviews',
					},
				},
				{
					$addFields: {
						reviewsCount: { $size: '$reviews' }, // count
						reviewsAvg: { $avg: '$reviews.rating' }, // расчет среднего
						reviews: {
							$function: {
								body: `function(reviews){
									reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
									return reviews;
								}`,
								args: ['$reviews'],
								lang: 'js',
							},
						},
					},
				},
			])
			.exec()) as (ProductDocument & {
			review: ReviewDocument[];
			reviewCount: number;
			reviewAvg: number;
		})[];
	}
}
