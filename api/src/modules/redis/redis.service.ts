import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: 'localhost',
      port: 6379,
    });

    this.client.on('connect', () => {
      console.log('Conectando ao Redis...');
    });

    this.client.on('ready', () => {
      console.log('✅ Redis conectado e pronto para uso!');
    });

    this.client.on('error', (err) => {
      console.error('❌ Erro ao conectar ao Redis:', err);
    });

    this.client.on('close', () => {
      console.log('🔌 Conexão com Redis fechada.');
    });
  }

  async getServiceId(enterpriseId: string, serviceName: string) {
    return await this.client.hget(`services:${enterpriseId}`, serviceName);
  }

  async setServiceId(
    enterpriseId: string,
    serviceName: string,
    serviceId: string,
  ) {
    try {
      await this.client.hset(
        `services:${enterpriseId}`,
        serviceName,
        serviceId,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
