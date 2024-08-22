import {IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty({message: "Username is required"})
    username: string;
    @IsString()
    @IsEmail({},{message: "Invalid email format"})
    @IsNotEmpty({message: "Email is required"})
    email: string;
    @IsOptional()
    password: string;
    @IsOptional()
    profilePic: string;
}
