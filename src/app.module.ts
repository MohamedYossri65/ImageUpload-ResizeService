import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from './image/image.module';
import { Image } from './entities/image.entity';
import * as process from "node:process";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST|| "localhost",
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER_NAME || "root",
      password: process.env.DATABASE_PASSWORD || "root",
      database:  process.env.DATABASE_NAME||"test",
      entities: [Image],
      synchronize: true,
    }),
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
