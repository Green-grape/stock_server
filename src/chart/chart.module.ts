import { Module } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ChartController } from './chart.controller';

@Module({
  imports:[],
  controllers: [ChartController],
  providers: [ChartService],
})
export class ChartModule {}
