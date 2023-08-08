import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
	Post,
	PostSchema,
	User,
	UserSchema,
} from './models';
import { UserController } from './user.controller';

@Module({
	providers: [UserService],
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Post.name, schema: PostSchema },
		]),
	],
	controllers: [UserController],
})
export class UserModule {}
