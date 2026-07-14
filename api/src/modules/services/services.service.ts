import { ConflictException, Injectable } from '@nestjs/common';
import { ServiceRepository } from './services.repository';

@Injectable()
export class ServicesService {
  constructor(private readonly serviceLogRepo: ServiceRepository) {}

  async create(name: string, enterpriseId: string) {
    const newService = await this.serviceLogRepo.create(name, enterpriseId);
    if (!newService) {
      throw new ConflictException('Problemas ao criar novo service');
    }
    return newService.id;
  }

  async findAll(enterpriseId: string) {
    const services = await this.serviceLogRepo.findAll(enterpriseId);
    return services;
  }
}
