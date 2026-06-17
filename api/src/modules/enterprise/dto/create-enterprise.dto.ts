import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnterpriseDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  cnpj!: string;
}
