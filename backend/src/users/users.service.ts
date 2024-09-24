import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Import your PrismaService
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Get all users
  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  // Get a user by ID
  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Create a new user
  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  // Update a user by ID
  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Delete a user by ID
  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
