import { Injectable } from '@nestjs/common';
import { AuthUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt/dist';
import {  UnauthorizedException} from '@nestjs/common/exceptions'
import { User } from 'src/users/users.model'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthUserDto) {
    const user = await this.validateUser(authDto);
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(authDto: AuthUserDto) {
    const user = await this.usersService.getUserByEmail(authDto.email);
    if (user) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или password',
    });
  }
}
