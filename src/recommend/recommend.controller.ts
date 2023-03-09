import { Controller, Get, Post, Req } from '@nestjs/common';
import { CreateRecommendStockDto } from './dto/create.recommend.stock.dto';
import { RecommendModule } from './recommend.module';
import { RecommendService } from './recommend.service';
import { Request } from 'express';
import { MyReq } from 'src/common/decorators/request.decorators';

@Controller('api/recommend')
export class RecommendController {
  constructor(private recommendService: RecommendService) {}
  @Post()
  setRecommendStock(
    @MyReq('body') createRecommendStockDto: CreateRecommendStockDto,
  ) {
    return this.recommendService.setRecommendStock(createRecommendStockDto);
  }
  @Get('today')
  getTodayRecommendStock() {
    return this.recommendService.getTodayRecommendStock();
  }
}
