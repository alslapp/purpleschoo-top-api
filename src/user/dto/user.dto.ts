import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	passwordHash: string;

	@IsArray()
	@IsOptional()
	images?: string[];
}
