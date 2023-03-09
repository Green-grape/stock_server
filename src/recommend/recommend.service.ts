import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { RecommendStock } from 'src/entities/recommend.stock.entity';
import { CreateRecommendStockDto } from './dto/create.recommend.stock.dto';
import mongoose, { Model } from 'mongoose';
import { RecommendStockSchema } from 'src/schemas/recommend.stock.schema';

@Injectable()
export class RecommendService {
  private recommendStockModel;
  constructor() {
    this.recommendStockModel = mongoose.model(
      'recommendStock',
      RecommendStockSchema,
    );
  }

  date_format(date: Date) {
    let ret = '';
    ret += date.getFullYear().toString();
    ret += date.getMonth().toString();
    ret += date.getDate().toString();
    return ret;
  }

  async setRecommendStock(stocks: CreateRecommendStockDto) {
    const { stockCodes, stockNames } = stocks;
    for (let i = 0; i < stockCodes.length; i++) {
      const stock = await this.recommendStockModel.findOne({
        stockCode: stockCodes[i],
      });
      if (stock === null) {
        const newStock = new this.recommendStockModel({
          createdAt: Date.now(),
          updatedAt: Date.now(),
          stockName: stockNames[i],
          stockCode: stockCodes[i],
        });
        await newStock.save();
      } else {
        if (this.date_format(stock.updatedAt) === this.date_format(new Date()))
          continue;
        await stock.update(
          { stockCode: stockCodes[i] },
          { updatedAt: Date.now() },
        );
      }
    }
    return { success: true };
  }
  //오늘 추천 종목만을 반환
  async getTodayRecommendStock() {
    const today_start = new Date();
    today_start.setHours(0, 0, 0, 0);
    const stocks = await this.recommendStockModel.find(
      {
        updatedAt: { $gte: today_start },
      },
      '-_id -updatedAt -createdAt',
    );
    return stocks;
  }
}
