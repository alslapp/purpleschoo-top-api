import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopPage, TopPageDocument } from './models';
import { CreateTopPageDto, TopLevelCategoryEnum, UpdateTopPageDto } from './dto';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPage.name)
		private topPageModel: Model<TopPageDocument>,
	) {}

	async create(dto: CreateTopPageDto) {
		const newTp = new this.topPageModel(dto);
		return await newTp.save();
	}

	async findById(id: string) {
		return this.topPageModel.findById(id);
	}

	async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias });
	}

	async getAll() {
		return this.topPageModel.find();
	}

	ifCanUpdate(_id: string, dto: UpdateTopPageDto) {
		return this.topPageModel.findOne({
			_id: { $ne: _id },
			alias: dto.alias,
		});
	}

	updateById(_id: string, data: UpdateTopPageDto) {
		return this.topPageModel.findOneAndUpdate({ _id }, data, { new: true });
	}

	async deleteById(_id: string) {
		return this.topPageModel.deleteOne({ _id });
	}

	async findByCategory(firstCategory: TopLevelCategoryEnum) {
		//return this.topPageModel.find({ firstCategory }, 'title secondCategory alias');
		// return this.topPageModel.aggregate([
		// 	{
		// 		$match: {
		// 			firstCategory,
		// 		},
		// 	},
		// 	{
		// 		$group: {
		// 			_id: { secondCategory: '$secondCategory' },
		// 			pages: {
		// 				$push: {
		// 					alias: '$alias',
		// 					title: '$title',
		// 				},
		// 			},
		// 		},
		// 	},
		// ]);

		// или чейним
		return this.topPageModel
			.aggregate()
			.match({
				firstCategory,
			})
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: {
					$push: {
						alias: '$alias',
						title: '$title',
					},
				},
			})
			.sort({
				// стабильная сортировка
				_id: 1,
			});
	}

	findByText(text: string) {
		return this.topPageModel.find({
			$text: {
				$search: text,
				$caseSensitive: false,
			},
		});
	}
}
