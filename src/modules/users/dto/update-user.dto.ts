
import { IsMongoId, IsNotEmpty, IsOptional,} from 'class-validator';

export class UpdateUserDto {
    @IsMongoId({message : 'Invalid _id'})
    @IsNotEmpty({message : '_id is required'})
    _id : string;
    @IsOptional()
    profilePic: string;
    @IsOptional()
    followers: string[];
    @IsOptional()
    bio: string;
    @IsOptional()
    isFrozen: boolean;
    @IsOptional()
    username: string;
}
