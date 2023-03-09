import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { RecommendStock } from 'src/entities/recommend.stock.entity';
import { CreateRecommendStockDto } from './dto/create.recommend.stock.dto';

@Injectable()
export class RecommendService {
    constructor(
        @InjectRepository(RecommendStock)
        private recommendStockRepo:Repository<RecommendStock>
    ){}

    date_format(date:Date){
        let ret="";
        ret+=date.getFullYear().toString();
        ret+=date.getMonth().toString();
        ret+=date.getDate().toString();
        return ret;
    }

    async setRecommendStock(stocks:CreateRecommendStockDto){
        const {stockCodes,stockNames}=stocks;
        for(let i=0;i<stockCodes.length;i++){
            const stock=await this.recommendStockRepo.findOneBy({stockCode:stockCodes[i]});
            if(stock===null){
                const newStock=new RecommendStock();
                newStock.stockCode=stockCodes[i];
                newStock.stockName=stockNames[i];
                await this.recommendStockRepo.save(newStock); 
            }else{
                if(this.date_format(stock.updatedAt)===this.date_format(new Date())) continue;
                await this.recommendStockRepo.update(stock.id,{stockName:stockNames[i]});
            }
        }
        return {success:true};
    }
    //오늘 추천 종목만을 반환
    async getTodayRecommendStock(){
        const today_start=new Date();
        today_start.setHours(0,0,0,0);
        const stocks=await this.recommendStockRepo.findBy({updatedAt:MoreThan(today_start)});
        return stocks;
    }

}
