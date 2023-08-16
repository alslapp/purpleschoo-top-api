import { PartialType } from '@nestjs/mapped-types';
import { CreateTopPageDto } from './create-toppage.dto';
export class UpdateTopPageDto extends PartialType(CreateTopPageDto) {}
