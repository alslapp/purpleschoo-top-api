import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from './dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ERROR_REGISTRATION } from './auth.constants';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService, private userService: UserService) {}

	@Post('register')
	async register(@Body() dto: AuthDto) {
		const findUser = await this.userService.findUser(dto.login);
		if (findUser) {
			throw new BadRequestException(ERROR_REGISTRATION);
		}
		return this.userService.createUser(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() { login, password }: AuthDto) {
		// return this.authService.login(dto);
		const { email } = await this.authService.validateUser(login, password);
		return this.authService.login(email);
	}
}
