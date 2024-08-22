import { Controller, Get, Body, Patch, Param, Delete, HttpException, Post, Query} from '@nestjs/common';
import mongoose from 'mongoose';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto) {
        console.log(">> check create",createUserDto);
        return this.usersService.createUser(createUserDto);
    }

  @Get()
  async getAllUsers(
    @Query() query: string,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
      return await this.usersService.getAllUsers(query, +current, +pageSize);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if(!isValid) throw new HttpException('User not found', 404);
      const findUsers = await this.usersService.getUserById(id);
      if(!findUsers) throw new HttpException('User not found', 404);
      return findUsers;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if(!isValid) throw new HttpException('User not found', 400);
      const updatedUser = await this.usersService.updateUser(id, updateUserDto);
      if(!updatedUser) throw new HttpException('User not found', 404);
      return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if(!isValid) throw new HttpException('User not found', 400);
      const deletedUser = await this.usersService.deleteUser(id);
      if(!deletedUser) throw new HttpException('User not found', 404);
      return deletedUser;
  }
}
