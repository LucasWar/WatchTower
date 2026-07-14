import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/jwt-strategy.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy],
})
export class AuthModule {}
