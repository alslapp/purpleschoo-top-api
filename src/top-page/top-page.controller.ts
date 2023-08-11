import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { TopPageCreateDto, TopPageDto } from './dto';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
	constructor(private topPageService: TopPageService) {}

	@Post()
	async create(@Body() dto: TopPageCreateDto) {
		return await this.topPageService.create(dto);
	}

	@Get()
	async getAll() {
		return await this.topPageService.getAll();
	}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.topPageService.deleteById(id);
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: TopPageDto) {}

	@HttpCode(HttpStatus.OK)
	@Post()
	async find(@Body() dto: TopPageDto) {}
}
