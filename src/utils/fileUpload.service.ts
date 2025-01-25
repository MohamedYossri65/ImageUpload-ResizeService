import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class FileUploadService {
  private readonly rootUploadDir: string;

  constructor(private readonly configService: ConfigService) {
    this.rootUploadDir = this.configService.get<string>('UPLOAD_DIR', 'uploads'); // Default to 'uploads' if not set
  }
  private readonly quality = Number(this.configService.get<number>('IMAGE_QUALITY', 15));

  private async saveFileLocally(file: any, fileName: string, uploadDir: string): Promise<string> {
    const filePath = path.join(uploadDir, fileName);
    fs.mkdirSync(uploadDir, { recursive: true });
    await fs.promises.writeFile(filePath, file);
    return filePath;
  }

  async processAndSaveFile(
    file: Express.Multer.File,
    uploadDir: string,
  ): Promise<{ path: string; filename: string; size: any }> {
    const allowedTypes = ['jpg', 'jpeg', 'png', 'pdf'];
    const fileType = path.extname(file.originalname).toLowerCase().slice(1);

    if (!allowedTypes.includes(fileType)) {
      throw new BadRequestException(`File type ${fileType} is not allowed`);
    }

    try {
      let processedBuffer: Buffer;
      try {
        if (['jpg' ,'png' ,'jpeg'].includes(fileType)) {
          processedBuffer = await sharp(file.buffer)
            .rotate()
            .jpeg({ quality: this.quality })
            .toBuffer();
        } else {
          processedBuffer = file.buffer;
        }
      } catch (err) {
        throw new InternalServerErrorException('Failed to process file');
      }
      const fileName = `${uuidv4()}-${file.originalname}`;
      const dirPath = path.join(this.rootUploadDir, uploadDir);

      const filePath = await this.saveFileLocally(processedBuffer, fileName, dirPath);
      const sizeInBytes = processedBuffer.length;
      return { path: filePath, filename: fileName, size: sizeInBytes };
    } catch (err) {
      throw new InternalServerErrorException('Failed to process and save file');
    }
  }

  async processAndSaveFiles(
    files: Express.Multer.File[],
    uploadDir: string,
  ): Promise<{ path: string; filename: string }[]> {
    const results = await Promise.all(
      files.map(async (file) => {
        return await this.processAndSaveFile(file, uploadDir);
      }),
    );
    return results;
  }
}
