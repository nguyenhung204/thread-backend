import { comparePasswordHelper } from '@/helper/utils';
import { UsersService } from '@/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,

  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);
    console.log(">> user",user.username);
    const isValidPassword = await comparePasswordHelper(password, user.password);
    console.log(">> isValidPassword",isValidPassword);
    if(!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}