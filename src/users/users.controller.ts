import {
  Controller,
  Body,
  Post,
  Get,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Param,
  Res,
} from '@nestjs/common';

import {
  CreateUserDto,
  UpdateUserDto,
  PdfUserDto,
} from './dto/create-user.dto';
import { UsersService } from './users.service';

import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger/dist';

import { User } from './users.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, type: User })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post()
  create(@Body() userDto: CreateUserDto, @UploadedFile() image) {
    return this.usersService.createUser(userDto, image);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить одного пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить одного пользователя по id' })
  @ApiBody({ type: UpdateUserDto })
  // @UsePipes(ValidationPipe)
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() { email, firstname, lastname }: UpdateUserDto,
  ) {
    const user = await this.usersService.getUserById(id);
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    return this.usersService.updateUser(id, email, firstname, lastname);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить одного пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать pdf пользователя' })
  @Post('pdf')
  async createPdf(@Body() pdfDto: PdfUserDto, @Res() res): Promise<void> {
    const buffer = await this.usersService.createUserPdf(pdfDto);
    if (buffer) {
      res.json('true');
    } else {
      res.json('false');
    }
  }
}
