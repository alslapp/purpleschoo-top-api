import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopPage, TopPageDocument } from './models';
import { TopPageCreateDto } from './dto';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPage.name)
		private topPageModel: Model<TopPageDocument>,
	) {}

	async create(dto: TopPageCreateDto) {
		const newTp = new this.topPageModel(dto);
		return await newTp.save();
	}
	async getAll() {
		return this.topPageModel.find();
	}

	async deleteById(_id: string) {
		return this.topPageModel.deleteOne({ _id });
	}
}
