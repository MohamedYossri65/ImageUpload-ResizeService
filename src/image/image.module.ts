import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { FileUploadService } from '../utils/fileUpload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService, FileUploadService],
})
export class ImageModule {}
