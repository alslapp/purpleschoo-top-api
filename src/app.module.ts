import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGODB_URI'),
			}),
			inject: [ConfigService],
		}),
		//'mongodb://admin:root@localhost:27017/test?authSource=admin&retryWrites=true&w=majority'
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
