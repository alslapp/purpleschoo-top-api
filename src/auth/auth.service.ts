import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ERROR_USER_AUTH } from '../user/user.constants';
import { compare } from 'bcryptjs';
import { UserDocument } from '../user/models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private readonly jwtService: JwtService) {}

	async validateUser(email: string, password: string): Promise<Pick<UserDocument, 'email'>> {
		const user = await this.userService.findUser(email);
		if (!user) {
			throw new BadRequestException(ERROR_USER_AUTH);
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new BadRequestException(ERROR_USER_AUTH);
		}
		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
