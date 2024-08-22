import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/users.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPasswordHelper } from '@/helper/utils';
import aqp from 'api-query-params';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>)
    {}
     IsEmailExist = async(email: string) => {
        const isExist = await this.userModel.exists({ email });
        if (isExist) return true;
        return false;
    }
    async createUser(createUserDto: CreateUserDto) {
        const hashPass = await hashPasswordHelper(createUserDto.password);
        const isEmailExist = await this.IsEmailExist(createUserDto.email);
        if (isEmailExist) {
           throw new BadRequestException(`Email ${createUserDto.email} already exist :(`);
        }

        const newUser = new this.userModel({
            ...createUserDto,
            password: hashPass
        });
        return {
            user: await newUser.save(),
            message: "User created successfully"
        }
    }

    getUserById(id: string) {
        return this.userModel.findById(id);
    }

    async getAllUsers(query : string, current: number, pageSize: number) { 
        const {filter,sort} = aqp(query);
        if(filter.current) delete filter.current;
        if(filter.pageSize) delete filter.pageSize;

        if (!current) current = 1;
        if (!pageSize) pageSize = 5;

        const totalElements = (await this.userModel.find(filter)).length;
        const totalPages = Math.ceil(totalElements / pageSize);
        const skip = (current - 1) * pageSize;

        const results = await this.userModel
        .find(filter)
        .limit(pageSize)
        .skip(skip)
        .select('-password')
        .sort(sort as any);
        return {results, totalPages};

    }
    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
    
    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }
}