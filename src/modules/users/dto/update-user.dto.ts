import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    profilePic: string;
    followers: string[];
    bio: string;
    isFrozen: boolean;
    createdAt: Date;
}
