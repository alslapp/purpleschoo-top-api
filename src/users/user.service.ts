import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models';
import { Model } from 'mongoose';
import { UserDto } from './dto';
import { UserCreateDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<UserDocument>,
	) {}

	async getByEmail(email: UserDto['email']) {
		return this.userModel.find({
			email,
		});
	}

	async createUser(dto: UserCreateDto) {
		const newUser = new this.userModel({
			email: dto.email,
			password: dto.password,
		});
		return await newUser.save();
	}

	getAll() {
		return this.userModel.find();
	}

	deleteById(_id: string) {
		return this.userModel.deleteOne({ _id });
	}
}
