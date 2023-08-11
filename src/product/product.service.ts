import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './models';
import { ProductCreateDto } from './dto';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name)
		private productModel: Model<ProductDocument>,
	) {}

	async create(dto: ProductCreateDto) {
		const newProd = new this.productModel(dto);
		return await newProd.save();
	}

	async getAll() {
		return this.productModel.find();
	}
}
