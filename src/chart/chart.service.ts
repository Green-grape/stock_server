import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { GetChartDto } from './dto/get.chart.dto';
import { StockDataDocument, StockDataSchema } from 'src/schemas/stock.data.schema';
import { Model, Schema ,Connection} from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class ChartService {
    constructor(){}
    async getStockChartMin(code:string, beginDate:number, endDate:number){
        const stockDataModel=mongoose.model('A'+code, StockDataSchema);
        const stockDatas=await stockDataModel.find({
            date:{$gte:beginDate, $lte:endDate}
        },"-_id"); //object_id빼고출력
        return stockDatas;
    }
}
