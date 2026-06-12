import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsModule } from './modules/logs/logs.module';
import { DatabaseModule } from './database/database.module';
import { BullModule } from '@nestjs/bullmq';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
