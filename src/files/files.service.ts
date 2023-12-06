import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  // async createFilePdf(candidate): Promise<any> {
  //   try {
  //     const filePath = path.resolve(__dirname, '..', 'static');
  //     return fs.readFile(
  //       path.join(filePath, candidate.image),
  //       'utf8',
  //       function (error, fileContent) {
  //         if (error) throw error; // ошибка чтения файла, если есть
  //         console.log(candidate.firstname + candidate.lastName + fileContent); // содержимое файл
  //       },
  //     );
  //   } catch (e) {
  //     throw new HttpException(
  //       'Ошибка при записи файла',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
  // fs.writeFile(
  //   'file.pdf',
  //   candidate.firstname + candidate.lastName + candidate.image,
  //   function (error) {
  //     if (error) throw error; // ошибка чтения файла, если есть
  //     console.log('Данные успешно записаны записать файл');
  //   },
  // );
}
