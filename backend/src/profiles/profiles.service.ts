import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  // Get all profiles
  async getAllProfiles() {
    return this.prisma.profile.findMany();
  }

  // Get a profile by ID
  async getProfileById(id: number) {
    return this.prisma.profile.findUnique({
      where: { id },
    });
  }

  // Create a profile
  async createProfile(data: Prisma.ProfileCreateInput) {
    return this.prisma.profile.create({
      data,
    });
  }

  // Update a profile by ID
  async updateProfile(id: number, data: Prisma.ProfileUpdateInput) {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  // Delete a profile by ID
  async deleteProfile(id: number) {
    return this.prisma.profile.delete({
      where: { id },
    });
  }
}
