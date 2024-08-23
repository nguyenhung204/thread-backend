import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  async login(@Body() createAuth : CreateAuthDto){
    return this.authService.signIn(createAuth.username, createAuth.password);
  }
  
}
