import { Expose, plainToClass } from "class-transformer";
import {IsEmail, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    name: string;
    @IsNotEmpty({message: "Username is required"})
    @Expose()
    username: string;
    @IsString()
    @IsEmail({},{message: "Invalid email format"})
    @IsNotEmpty({message: "Email is required"})
    @Expose()
    email: string;
    @Expose()
    @Length(6, 20, {message: "Password must be between 6 to 20 characters"})
    password: string;
    @Expose()
    @IsOptional()
    profilePic: string;
}

plainToClass(CreateUserDto, {});