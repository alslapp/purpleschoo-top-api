import {
	Prop,
	Schema,
	SchemaFactory,
} from '@nestjs/mongoose';
import {
	HydratedDocument,
	Schema as MSchema,
} from 'mongoose';
import { User } from '../../users/models';
import { Product } from '../../product/models';

export type ReviewDocument =
	HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	description: string;

	@Prop()
	rating: number;

	@Prop({
		type: MSchema.Types.ObjectId,
		ref: Product.name,
	})
	productId: Product;
}

export const ReviewSchema =
	SchemaFactory.createForClass(Review);
