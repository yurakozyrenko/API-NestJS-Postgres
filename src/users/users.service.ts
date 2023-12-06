import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto, PdfUserDto } from './dto/create-user.dto';
import { FilesService } from 'src/files/files.service';
import { HttpStatus } from '@nestjs/common/enums';
import * as PDFDocument from 'pdfkit';
import { resolve } from 'path';
import * as path from 'path';

import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private fileService: FilesService,
  ) {}

  async createUser(dto: CreateUserDto, image: any) {
    let email = dto.email;
    const candidate = await this.userRepository.findOne({
      where: { email },
    });
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const fileName = await this.fileService.createFile(image);
    const user = await this.userRepository.create({ ...dto, image: fileName });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getUserById(id: number) {
    const candidate = await this.userRepository.findOne({ where: { id } });
    if (!candidate) {
      throw new HttpException(
        'Пользователь с таким id несуществует',
        HttpStatus.BAD_REQUEST,
      );
    }
    return candidate;
  }

  async updateUser(
    id: number,
    email: string,
    firstname: string,
    lastname: string,
  ) {
    await this.getUserById(id);
    const user = await this.userRepository.update(
      { email, firstname, lastname },
      { where: { id } },
    );

    const candidate = await this.getUserById(id);
    return candidate;
  }

  async deleteUser(id: number) {
    await this.getUserById(id);
    const user = await this.userRepository.destroy({ where: { id } });
    return id;
  }

  async createUserPdf(dto): Promise<Buffer> {
    let email = dto.email;
    const candidate = await this.userRepository.findOne({ where: { email } });
    if (!candidate) {
      throw new HttpException(
        'Пользователь с таким email несуществует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const filePath = path.resolve(__dirname, '..', 'static');
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      doc.text(candidate.firstname);
      doc.moveDown();
      doc.text(candidate.lastname);
      doc.moveDown();
      doc.image(path.join(filePath, candidate.image), 100, 150, { width: 300 });

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });

    const user = await this.userRepository.update(
      { pdf: pdfBuffer },
      { where: { email } },
    );

    return pdfBuffer;
  }
}
