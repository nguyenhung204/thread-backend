import { Controller, Post, UseGuards, Request, Get, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from '@/decorater/custom';
import { CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly mailerService: MailerService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  handleLogin(@Request() req : any ){
    return this.authService.login(req.user);
  }

  @Get('mail')
  @Public()
  async sendMail() {
    this.mailerService
      .sendMail({
        to: "tuanhungvip12@gmail.com", 
        subject: 'Welcome to Ban Công Nghệ ✔', // Subject line
        text: 'welcome', // plaintext body
        template : "register",
        context :{
          name :"Nguyễn Hùng",
          activationCode : ""
        }
      })
    return {
      message : "Mail sent successfully"
    }
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
