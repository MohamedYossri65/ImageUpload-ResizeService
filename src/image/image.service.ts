import { Repository } from 'typeorm';
import { Image } from '../entities/image.entity';
import { catchAsyncErr } from '../utils/catchAsyncError';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CustomResponse } from '../utils/custom-response';
import { UploadImageDto } from './dtos/upload-image.dto';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private readonly imageRepository:Repository<Image> ) {
  }

  // Implement image processing logic here...
  uploadImage = catchAsyncErr(async (image:UploadImageDto):Promise<CustomResponse> => {
    const savedImage = this.imageRepository.create({
      filename: image.filename,
    })
    await this.imageRepository.save(savedImage);
    return {
      success: true,
      message: 'Image uploaded successfully',
      data: savedImage
  }
})

}
