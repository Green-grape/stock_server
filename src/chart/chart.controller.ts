import { Controller, Get } from '@nestjs/common';
import { MyReq } from 'src/common/decorators/request.decorators';
import { ChartService } from './chart.service';
import { GetChartDto } from './dto/get.chart.dto';

@Controller('api/chart')
export class ChartController {
  constructor(private chartService: ChartService) {}
  @Get('min')
  async getStockChartMin(@MyReq('query') getChartDto: GetChartDto) {
    const { code, beginDate, endDate } = getChartDto;
    return this.chartService.getStockChartMin(code, beginDate, endDate);
  }
}
