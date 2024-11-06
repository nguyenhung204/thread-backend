import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/users.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPasswordHelper } from '@/helper/utils';
import aqp from 'api-query-params';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import  dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
  private mailerService : MailerService
)
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

    async findByUserName(usesname : string){
        return await this.userModel.findOne({username: usesname});
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
    async updateUser(updateUserDto: UpdateUserDto) {
        return await this.userModel.updateOne({_id : updateUserDto._id}, {...updateUserDto});
    }

    async deleteUser(id: string) {
        //check id
        if(mongoose.isValidObjectId(id)){
            return this.userModel.findByIdAndDelete(id);
        }
        else{
            throw new BadRequestException('Invalid _id');
        }
    }

    async handleRegister(registerDto : CreateAuthDto) {
        const {username, password, email, name} = registerDto;

        const isUsernameExist = await this.userModel.exists({username});
        if (isUsernameExist) {
           throw new BadRequestException(`Username ${username} already exist :(`);
        }


        //check email exist
        const isExist = await this.IsEmailExist(email);
        if (isExist) {
           throw new BadRequestException(`Email ${email} already exist :(`);
        }
        //hash password
        const hashPass = await hashPasswordHelper(password);
        const codeId = uuidv4()
        
        const newUser = await this.userModel.create({
            username,
            password: hashPass,
            email,
            name,
            isActive : false,
            codeId : codeId,
            codeExpire : dayjs().add(5, 'minute')
        });

        // this.mailerService.sendMail(
        //     {
        //         to: 'tuanhungvip12@gmail.com' , 
        //         subject: 'Activate your account ✔', // Subject line
        //         text: 'Welcome', // plaintext body
        //         template : "register",
        //         context :{
        //         name : newUser.username ?? newUser.email,
        //         activationCode : codeId
        //     }
        // }
        // )   
        // return ping

        return {
            _id: newUser._id,
        }

        
    }
}
