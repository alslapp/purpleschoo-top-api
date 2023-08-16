import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { CreateTopPageDto, FindTopPageDto, UpdateTopPageDto } from './dto';
import { TopPageService } from './top-page.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TOP_PAGE_ERROR_EXISTS, TOP_PAGE_ERROR_NOT_FOUND } from './top-page.constants';
import { JwtAuthGuard } from '../auth/gards';

@Controller('top-page')
export class TopPageController {
	constructor(private topPageService: TopPageService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() dto: CreateTopPageDto) {
		const res = await this.topPageService.findByAlias(dto.alias);
		if (res) {
			throw new BadRequestException(TOP_PAGE_ERROR_EXISTS);
		}
		return this.topPageService.create(dto);
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const res = await this.topPageService.findByAlias(alias);
		if (!res) {
			throw new BadRequestException(TOP_PAGE_ERROR_NOT_FOUND);
		}
		return res;
	}

	@Get()
	async getAll() {
		return await this.topPageService.getAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findById(@Param('id', IdValidationPipe) id: string) {
		const res = await this.topPageService.findById(id);
		if (!res) {
			throw new NotFoundException(TOP_PAGE_ERROR_NOT_FOUND);
		}
		return res;
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async updateById(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdateTopPageDto) {
		const ifCanUpdate = await this.topPageService.ifCanUpdate(id, dto);
		if (ifCanUpdate) {
			throw new NotFoundException(TOP_PAGE_ERROR_EXISTS);
		}
		return this.topPageService.updateById(id, dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const res = await this.topPageService.findById(id);
		if (!res) {
			throw new NotFoundException(TOP_PAGE_ERROR_NOT_FOUND);
		}
		return this.topPageService.deleteById(id);
	}

	@HttpCode(HttpStatus.OK)
	@Post('find')
	findByCategory(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory);
	}

	@HttpCode(HttpStatus.OK)
	@Get('textSearch/:text')
	textSearch(@Param('text') text: string) {
		return this.topPageService.findByText(text);
	}
}
