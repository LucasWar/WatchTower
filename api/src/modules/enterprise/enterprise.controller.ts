import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import { EnterpriseService } from './services/enterprise.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { LoginInterpriseDTO } from './dto/login-enterprise.dto';
import { JwtEnterpriseGuard } from './jwt-enterprise.guard';

@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return await this.enterpriseService.create(createEnterpriseDto);
  }

  @Post('token')
  @HttpCode(200)
  async login(@Body() loginInterpriseDTO: LoginInterpriseDTO) {
    return await this.enterpriseService.login(loginInterpriseDTO);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.enterpriseService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.enterpriseService.remove(+id);
  // }
}
