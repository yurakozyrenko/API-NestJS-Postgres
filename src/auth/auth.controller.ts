import { Controller, Body, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Авторизация')
@Controller('auth')
 
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'авторизация пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  //   @ApiOperation({ summary: 'Создание пользователя' })
  //   @ApiResponse({ status: 200, type: User })
  // @Post('/registration')
  // registration(@Body() userDto: CreateUserDto) {
  //   return this.authService.registration(userDto);
  // }
}
