import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsModule } from './modules/logs/logs.module';
import { DatabaseModule } from './database/database.module';
import { BullModule } from '@nestjs/bullmq';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ServicesModule } from './modules/services/services.module';
import { RedisModule } from './modules/redis/redis.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    LogsModule,
    DatabaseModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    EnterpriseModule,
    ServicesModule,
    RedisModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
