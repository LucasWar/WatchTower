import { Module } from '@nestjs/common';
import { EnterpriseService } from './services/enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { EnterpriseRepository } from './enterprise.repository';
import { JwtStrategyEnterprise } from './services/entrepise-auth.service';

@Module({
  controllers: [EnterpriseController],
  providers: [EnterpriseService, EnterpriseRepository, JwtStrategyEnterprise],
  exports: [EnterpriseService],
})
export class EnterpriseModule {}
