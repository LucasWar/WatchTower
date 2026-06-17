import { IsNotEmpty, IsString } from 'class-validator';

export class LoginInterpriseDTO {
  @IsString()
  @IsNotEmpty()
  apiId!: string;

  @IsString()
  @IsNotEmpty()
  apiKey!: string;
}
