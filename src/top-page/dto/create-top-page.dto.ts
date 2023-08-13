import { TopPageDto } from './top-page.dto';
import { PartialType } from '@nestjs/mapped-types';

export class TopPageCreateDto extends PartialType(TopPageDto) {}
