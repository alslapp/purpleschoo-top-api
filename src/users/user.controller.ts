import {
	Body,
	Controller,
	Get,
	Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserDto } from './dto';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post()
	async create(@Body() dto: UserCreateDto) {
		return await this.userService.createUser(dto);
	}

	@Get('getByEmail')
	async getByEmail(
		@Body('email') email: UserDto['email'],
	) {
		return await this.userService.getByEmail(
			email,
		);
	}
}
