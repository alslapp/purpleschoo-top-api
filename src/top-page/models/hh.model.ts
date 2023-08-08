import {
	Prop,
	Schema,
	SchemaFactory,
} from '@nestjs/mongoose';

@Schema()
export class HHAdvantage {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

export const HHAdvantageSchema =
	SchemaFactory.createForClass(HHAdvantage);
