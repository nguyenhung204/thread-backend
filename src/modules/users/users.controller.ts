import { Controller, Get, Body, Patch, Param, Delete, HttpException, Post, Query} from '@nestjs/common';
import mongoose from 'mongoose';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '@/decorater/custom';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto) {
        console.log(">> check create",createUserDto);
        return this.usersService.createUser(createUserDto);
    }

  @Get()
  @Public() 
  async getAllUsers(
    @Query() query: string,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
      return await this.usersService.getAllUsers(query, +current, +pageSize);
  }

  @Patch()
  async updateUser( @Body() updateUserDto: UpdateUserDto) {

      const updatedUser = await this.usersService.updateUser(updateUserDto);
      if(!updatedUser) throw new HttpException('User not found', 404);
      return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
      const deletedUser = await this.usersService.deleteUser(id);
      if(!deletedUser) throw new HttpException('User not found', 404);
      return deletedUser;
  }
}
