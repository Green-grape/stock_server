import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class GetChartDto{
    @IsString()
    code:string;

    @Type(()=>Number)
    @IsNumber()
    beginDate:number;

    @Type(()=>Number)
    @IsNumber()
    endDate:number;
}