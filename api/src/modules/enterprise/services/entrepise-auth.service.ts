import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type JwtPayload = {
  sub: string;
};

@Injectable()
export class JwtStrategyEnterprise extends PassportStrategy(
  Strategy,
  'enterpriseStrategy',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>(
        'JWT_ACCESS_SECRET_ENTERPRISE',
      ),
    });
  }

  validate(payload: JwtPayload) {
    return { enterpriseId: payload.sub };
  }
}
