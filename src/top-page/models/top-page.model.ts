import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TopLevelCategoryEnum } from '../dto';

type TopPageAdvantage = {
	title: string;
	description: string;
};

type Hh = {
	count: number;
	juniorSalary: number;
	middleSalary: number;
	seniorSalary: number;
};

export type TopPageDocument = HydratedDocument<TopPage>;

@Schema({ timestamps: true })
export class TopPage {
	@Prop()
	firstCategory: TopLevelCategoryEnum;

	@Prop()
	secondCategory: string;

	@Prop()
	title: string;

	@Prop({ required: true, unique: true })
	alias: string;

	@Prop()
	hh: Hh[];

	@Prop()
	advantages: TopPageAdvantage[];

	@Prop()
	seoText: string;

	@Prop()
	tagsTitle: string;

	@Prop([String])
	tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
TopPageSchema.index({
	// делаем индексируемым все поля документа, в том числе и массивы и объекты
	// т.к. поставить индекс на одно поле, которое является массивом нет возможности.
	// Только на весь документ сразу
	'$**': 'text',
	// если не нужно искать по массивам, то можно создать индексы только по нужным полям
	// title: 'text', seoText: 'text'
});
