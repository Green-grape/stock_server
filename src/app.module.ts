import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import {typeOrmConfig } from './config/typeorm.config';
import { RecommendModule } from './recommend/recommend.module';
import { ConfigModule } from '@nestjs/config';
import { ChartModule } from './chart/chart.module';
import { MongooseModule } from '@nestjs/mongoose/dist';
import config from "./config/configuration";

@Module({
  imports: [
    //TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      load:[config]
    }),
    RecommendModule,
    ChartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
