import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsUUID()
  @IsNotEmpty()
  enterpriseId!: string;
}
