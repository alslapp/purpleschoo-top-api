import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserDto } from './dto';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post()
	create(@Body() dto: UserCreateDto) {
		return this.userService.createUser(dto);
	}

	@Get()
	getAll() {
		return this.userService.getAll();
	}

	@Get('getByEmail')
	getByEmail(@Body('email') email: UserDto['email']) {
		return this.userService.getByEmail(email);
	}

	@Delete(':id')
	deleteById(@Param('id') id: string) {
		return this.userService.deleteById(id);
	}
}
