import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models';
import { Model } from 'mongoose';
import { AuthDto } from '../auth/dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const passwordHash = await hash(dto.password, salt);
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash,
		});
		return this.sanitizeUser(await newUser.save());
	}
	getAll() {
		return this.userModel.find();
	}
	deleteById(_id: string) {
		return this.userModel.deleteOne({ _id });
	}

	findUser(email: string) {
		return this.userModel.findOne({ email });
	}

	findUserById(id: string) {
		return this.userModel.findById(id);
	}

	sanitizeUser(user: UserDocument) {
		const sanitized: Partial<UserDocument> = user.toObject();
		delete sanitized.passwordHash;
		return sanitized;
	}
}
