import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './singIn.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
