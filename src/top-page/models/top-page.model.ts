import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TopLevelCategory, TopPageDto } from '../dto';
import { TopPageAdvantage, TopPageAdvantageSchema } from './advantage.model';

import { HHAdvantage, HHAdvantageSchema } from './hh.model';

export type TopPageDocument = HydratedDocument<TopPage>;

@Schema({ timestamps: true })
export class TopPage {
	@Prop({
		type: String,
		enum: TopLevelCategory,
	})
	firstCategory: TopPageDto['firstCategory'];

	@Prop()
	secondCategory: string;

	@Prop()
	title: string;

	@Prop({ required: true, unique: true })
	alias: string;

	@Prop({ type: [HHAdvantageSchema] })
	hh: HHAdvantage[];

	@Prop({ type: [TopPageAdvantageSchema] })
	advantages: TopPageAdvantage[];

	@Prop()
	seoText: string;

	@Prop()
	tagsTitle: string;

	@Prop([String])
	tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
