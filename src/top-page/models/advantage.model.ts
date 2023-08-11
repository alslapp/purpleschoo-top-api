import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TopPageAdvantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

export const TopPageAdvantageSchema = SchemaFactory.createForClass(TopPageAdvantage);
