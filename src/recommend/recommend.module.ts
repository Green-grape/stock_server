import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendStock } from 'src/entities/recommend.stock.entity';
import { RecommendController } from './recommend.controller';
import { RecommendService } from './recommend.service';

@Module({
  imports: [],
  controllers: [RecommendController],
  providers: [RecommendService],
})
export class RecommendModule {}
