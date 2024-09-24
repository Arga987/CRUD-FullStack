import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Prisma } from '@prisma/client';

@Controller('api/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // [GET] /api/profiles - Get all profiles
  @Get()
  async getAllProfiles() {
    return this.profilesService.getAllProfiles();
  }

  // [GET] /api/profiles/:id - Get a specific profile
  @Get(':id')
  async getProfileById(@Param('id') id: string) {
    return this.profilesService.getProfileById(Number(id));
  }

  // [POST] /api/profiles - Create a new profile
  @Post()
  async createProfile(@Body() data: Prisma.ProfileCreateInput) {
    return this.profilesService.createProfile(data);
  }

  // [PATCH] /api/profiles/:id - Update a profile
  @Patch(':id')
  async updateProfile(@Param('id') id: string, @Body() data: Prisma.ProfileUpdateInput) {
    return this.profilesService.updateProfile(Number(id), data);
  }

  // [DELETE] /api/profiles/:id - Delete a profile
  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    return this.profilesService.deleteProfile(Number(id));
  }
}
