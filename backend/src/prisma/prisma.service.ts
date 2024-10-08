import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // Connects to the database when the module is initialized
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Disconnects from the database when the module is destroyed
  }
}
