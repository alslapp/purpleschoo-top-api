import {
	IsArray,
	IsEmail,
	IsNotEmpty,
	IsString,
} from 'class-validator';

export class UserDto {
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsArray()
	images: string[];

	@IsString()
	createdAt: Date;

	@IsString()
	updatedAt: Date;
}
