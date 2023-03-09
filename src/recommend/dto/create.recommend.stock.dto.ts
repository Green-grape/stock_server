import {IsArray, ValidateNested} from "class-validator";
import {Type} from 'class-transformer';

export class CreateRecommendStockDto{
    @IsArray()
    stockCodes:string[];

    @IsArray()
    stockNames:string[];
}