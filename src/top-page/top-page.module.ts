import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPage, TopPageSchema } from './models';

@Module({
	controllers: [TopPageController],
	providers: [TopPageService],
	imports: [
		MongooseModule.forFeature([
			{
				name: TopPage.name,
				schema: TopPageSchema,
			},
		]),
	],
})
export class TopPageModule {}
