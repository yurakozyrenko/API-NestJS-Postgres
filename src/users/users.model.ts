import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

interface UserCreationAttrs {
  email: string;
  firstname: string;
  lastName: string;
  image: string;
  pdf: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  //

  @ApiProperty({
    example: 'example@example.com',
    description: 'email пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  //

  @ApiProperty({
    example: 'Yura',
    description: 'firstname пользователя',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  firstname: string;
  //

  @ApiProperty({
    example: 'Kazyrenka',
    description: 'lastname пользователя',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  lastname: string;
  //

  @ApiProperty({})
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;
// 

  @ApiProperty({})
  @Column({ type: DataType.BLOB })
  pdf: Buffer;

  //
}
