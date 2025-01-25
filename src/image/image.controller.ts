import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../utils/fileUpload.service';
import { ImageService } from "./image.service";

@Controller('image')
export class ImageController {
  constructor(private readonly fileUploadService: FileUploadService,
              private readonly imageUploadService:ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 173155200 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    const imageDetails = await this.fileUploadService.processAndSaveFile(file, 'images');
    console.log(imageDetails);
    return this.imageUploadService.uploadImage(imageDetails);
  }
}
