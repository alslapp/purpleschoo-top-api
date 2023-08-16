import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

import { ERROR_USER_NOT_EXISTS } from './user.constants';
import { JwtAuthGuard } from '../auth/gards';
import {IdValidationPipe} from "../pipes/id-validation.pipe";

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	getAll() {
		return this.userService.getAll();
	}

	@Get('getByEmail')
	async findUser(@Body('email') email: string) {
		const user = await this.userService.findUser(email);
		if (!user) {
			throw new HttpException(ERROR_USER_NOT_EXISTS, HttpStatus.NOT_FOUND);
		}
		return user;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteById(@Param('id', IdValidationPipe) id: string) {
		const user = await this.userService.findUserById(id);
		if (!user) {
			throw new HttpException(ERROR_USER_NOT_EXISTS, HttpStatus.NOT_FOUND);
		}
		return this.userService.deleteById(id);
	}
}
