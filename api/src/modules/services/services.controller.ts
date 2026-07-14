import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentEnterpriseHttp } from 'src/shared/decorators/current-enterprise-http.decorator';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @UseInterceptors(JwtAuthGuard)
  create(@CurrentEnterpriseHttp() enterpriseId: string) {
    return this.servicesService.findAll(enterpriseId);
  }
}
