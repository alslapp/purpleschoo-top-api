import {
	Prop,
	Schema,
	SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument =
	HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
	@Prop({ required: true, unique: true })
	title: string;

	@Prop({ required: true })
	price: number;

	@Prop()
	oldPrice: number;

	@Prop()
	credit: number;

	@Prop()
	calculatedRating: number;

	@Prop()
	image: string;

	@Prop()
	description: string;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop([String])
	categories: string[];

	@Prop()
	tags: string;

	// @Prop()
	// characteristics: {
	// 	[key: string]: string;
	// };
}

export const ProductSchema =
	SchemaFactory.createForClass(Product);
