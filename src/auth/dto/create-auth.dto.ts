import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAuthDto {
    
    @IsString()
    @IsNotEmpty()
    username : string;
    @IsString()
    @IsNotEmpty({message: "Password is required"})
    @Length(6, 20)
    password : string;
}
