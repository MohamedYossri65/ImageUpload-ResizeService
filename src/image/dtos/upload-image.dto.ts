import { IsString } from "class-validator";

export class UploadImageDto{
  @IsString()
  filename: string;
  @IsString()
  path: string ;

  size: any;
}
