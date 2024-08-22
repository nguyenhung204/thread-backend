import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema,
        },
    ]),
],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
