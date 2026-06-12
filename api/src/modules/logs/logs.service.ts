import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { LogsRepository } from './logs.repository';

@Injectable()
export class LogsService {
  constructor(private readonly logRepo: LogsRepository) {}

  create(createLogDto: CreateLogDto) {
    console.log("OLA")
    return this.logRepo.create(createLogDto);
  }
}
