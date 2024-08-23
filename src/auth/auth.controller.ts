import { Controller, Post, UseGuards, Request, Get, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from '@/decorater/custom';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  handleLogin(@Request() req : any ){
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  async register(@Body() registerDto : CreateAuthDto ) {
    return this.authService.handleRegister(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req : any) {
    return req.user;
  }
}
