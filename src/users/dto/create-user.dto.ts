import { UserDto } from './user.dto';

export type UserCreateDto = Pick<
	UserDto,
	'email' | 'password'
>;
