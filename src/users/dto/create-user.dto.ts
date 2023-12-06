import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'email пользователя',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Не Должно быть пустым' })
  readonly email: string;
  //

  @ApiProperty({ example: 'Yura', description: 'firstname пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Не Должно быть пустым' })
  readonly firstname: string;
  //

  @ApiProperty({ example: 'Kazyrenka', description: 'lastname пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Не Должно быть пустым' })
  readonly lastname: string;

  @ApiProperty({
    example: 'Kazyrenka.jpg',
    description: 'изоражение пользователя',
  })
  readonly image: string;
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'email пользователя',
    required: false,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Не Должно быть пустым' })
  readonly email: string;
  //

  @ApiProperty({
    example: 'Yura',
    description: 'firstname пользователя',
    required: false,
  })
  @IsNotEmpty({ message: 'Не Должно быть пустым' })
  readonly firstname: string;
  //

  @ApiProperty({
    example: 'Kazyrenka',
    description: 'lastname пользователя',
    required: false,
  })
  @IsNotEmpty({ message: 'Не Должно быть пустым' })
  readonly lastname: string;
}

export class PdfUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'email пользователя',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Не Должно быть пустым' })
  readonly email: string;
  //
}

export class AuthUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'email пользователя',
    required: false,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Не Должно быть пустым' })
  readonly email: string;
}
