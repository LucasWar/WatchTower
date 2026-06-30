import { PrismaClient, LogLevel } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

const ENTERPRISE_ID = 'b080494b-2f83-4ffb-8745-d9ac33dd848a';

const SERVICES = [
  'auth-service',
  'payment-service',
  'notification-service',
  'gateway-service',
  'user-service',
];

const MODULES = [
  'users',
  'payments',
  'orders',
  'notifications',
  'authentication',
];

const ACTIONS = [
  'CREATE',
  'UPDATE',
  'DELETE',
  'LOGIN',
  'LOGOUT',
  'PROCESS_PAYMENT',
  'SEND_EMAIL',
];

const PATHS = [
  '/api/users',
  '/api/users/:id',
  '/api/orders',
  '/api/orders/:id',
  '/api/payments',
  '/api/payments/process',
  '/api/auth/login',
  '/api/auth/logout',
  '/api/notifications',
];

const MESSAGES = [
  'Operation completed successfully',
  'User authenticated successfully',
  'Payment processed successfully',
  'Notification sent',
  'Validation failed',
  'Unexpected error occurred',
  'Resource updated',
  'Resource created',
  'Resource deleted',
];

function generateDuration() {
  const random = Math.random();

  if (random < 0.4) {
    return faker.number.int({
      min: 20,
      max: 100,
    });
  }

  if (random < 0.75) {
    return faker.number.int({
      min: 100,
      max: 300,
    });
  }

  if (random < 0.95) {
    return faker.number.int({
      min: 300,
      max: 1000,
    });
  }

  return faker.number.int({
    min: 1000,
    max: 5000,
  });
}

function generateLevel(): LogLevel {
  return faker.helpers.weightedArrayElement([
    {
      value: LogLevel.INFO,
      weight: 70,
    },
    {
      value: LogLevel.DEBUG,
      weight: 15,
    },
    {
      value: LogLevel.WARN,
      weight: 10,
    },
    {
      value: LogLevel.ERROR,
      weight: 4,
    },
    {
      value: LogLevel.FATAL,
      weight: 1,
    },
  ]);
}

function generateCreatedAt() {
  const now = new Date();
  // Converte para UTC explicitamente
  const nowUTC = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const twoAndHalfHoursAgo = nowUTC - 2.5 * 60 * 60 * 1000;

  return new Date(faker.number.int({ min: twoAndHalfHoursAgo, max: nowUTC }));
}

function generateMetadata(level: LogLevel) {
  const metadata: any = {
    duration: generateDuration(),

    method: faker.helpers.arrayElement([
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
    ]),

    path: faker.helpers.arrayElement(PATHS),

    statusCode: faker.helpers.arrayElement([
      200, 200, 200, 201, 204, 400, 401, 403, 404, 500, 502,
    ]),

    ip: faker.internet.ip(),

    requestSize: faker.number.int({
      min: 200,
      max: 10000,
    }),

    responseSize: faker.number.int({
      min: 100,
      max: 50000,
    }),

    region: faker.helpers.arrayElement(['sa-east-1', 'us-east-1', 'us-west-2']),

    userAgent: faker.internet.userAgent(),
  };

  if (level === LogLevel.ERROR || level === LogLevel.FATAL) {
    metadata.error = {
      code: faker.helpers.arrayElement([
        'INTERNAL_SERVER_ERROR',
        'TIMEOUT',
        'DATABASE_ERROR',
        'PAYMENT_FAILED',
        'AUTHENTICATION_FAILED',
      ]),

      retryable: faker.datatype.boolean(),

      stack: faker.lorem.lines(3),
    };
  }
  return metadata;
}

async function main() {
  const TOTAL_LOGS = 100000;

  // console.log('Limpando logs antigos...');

  // await prisma.logs.deleteMany({
  //   where: {
  //     enterpriseId: ENTERPRISE_ID,
  //   },
  // });

  console.log('Gerando logs...');

  const logs = Array.from(
    {
      length: TOTAL_LOGS,
    },
    () => {
      const level = generateLevel();

      return {
        service: faker.helpers.arrayElement(SERVICES),

        module: faker.helpers.arrayElement(MODULES),

        action: faker.helpers.arrayElement(ACTIONS),

        level,

        message: faker.helpers.arrayElement(MESSAGES),

        traceId: faker.string.uuid(),

        externalUserId: faker.datatype.boolean() ? faker.string.uuid() : null,

        environment: faker.helpers.arrayElement([
          'production',
          'staging',
          'development',
        ]),

        metadata: generateMetadata(level),

        enterpriseId: ENTERPRISE_ID,

        createdAt: generateCreatedAt(),
      };
    },
  );

  const batchSize = 5000;

  for (let i = 0; i < logs.length; i += batchSize) {
    const batch = logs.slice(i, i + batchSize);

    await prisma.logs.createMany({
      data: batch,
    });

    console.log(
      `Inseridos ${Math.min(i + batchSize, logs.length)}/${logs.length}`,
    );
  }

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
