import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEnterpriseDto } from '../dto/create-enterprise.dto';
import { EnterpriseRepository } from '../enterprise.repository';
import { generateApiKey } from 'src/utils/generate-api-key';
import { randomUUID } from 'crypto';
import { LoginInterpriseDTO } from '../dto/login-enterprise.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EnterpriseService {
  constructor(
    private readonly enterpriseRepo: EnterpriseRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(createEnterpriseDto: CreateEnterpriseDto) {
    const { name, cnpj } = createEnterpriseDto;

    const ownerCnpj = await this.enterpriseRepo.findEnterpriseByCnpj(cnpj);

    if (ownerCnpj) {
      throw new ConflictException('Cnpj já cadastrado no sistema');
    }

    const apiKey = generateApiKey();
    const apiId = randomUUID();

    await this.enterpriseRepo.create(name, cnpj, apiKey, apiId);
  }

  async login(loginInterpriseDTO: LoginInterpriseDTO) {
    const { apiId, apiKey } = loginInterpriseDTO;

    const enterprise = await this.enterpriseRepo.findEnterpriseByApiId(apiId);

    if (!enterprise) {
      throw new NotFoundException('Api_id não encontrado');
    }

    if (enterprise.apiKey !== apiKey) {
      throw new ConflictException('Chave de acesso incorreta');
    }

    const accessToken = await this.jwtService.signAsync(
      { sub: enterprise.id },
      {
        secret: process.env.JWT_ACCESS_SECRET_ENTERPRISE,
        expiresIn: '1h',
      },
    );

    return { accessToken };
  }

  findAll() {
    return this.enterpriseRepo.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} enterprise`;
  // }

  // update(id: number, updateEnterpriseDto: UpdateEnterpriseDto) {
  //   return `This action updates a #${id} enterprise`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} enterprise`;
  // }
}
