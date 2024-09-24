import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // [GET] /api/users - Get all users
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // [GET] /api/users/:id - Get a specific user
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  // [POST] /api/users - Create a new user
  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.createUser(data);
  }

  // [PATCH] /api/users/:id - Update a user
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.usersService.updateUser(Number(id), data);
  }

  // [DELETE] /api/users/:id - Delete a user
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
