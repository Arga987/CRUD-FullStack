import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, ProfilesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
