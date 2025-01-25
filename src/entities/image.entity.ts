import { AfterInsert, AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmpty, IsString } from 'class-validator';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsEmpty()
  filename: string;

  @AfterLoad()
  @AfterInsert()
  async loadImage() {
    if (this.filename) {
      this.filename = process.env.BASE_URL + 'uploads/images/' + this.filename;
    }
  }

}
