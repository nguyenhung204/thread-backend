import { comparePasswordHelper } from '@/helper/utils';
import { UsersService } from '@/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);
    const isValidPassword = await comparePasswordHelper(password, user.password);
    if (!isValidPassword || !user) {
      return null;
    }
    return user;
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async handleRegister(registerDto : CreateAuthDto) {
    return await this.usersService.handleRegister(registerDto);
  }

}