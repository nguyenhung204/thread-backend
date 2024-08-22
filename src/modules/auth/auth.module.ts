import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './jwtContains';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
    }
  ]
  ),
  PassportModule.register({ session: true }),
  UsersModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3600s' }
  }),
  ConfigModule,
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
