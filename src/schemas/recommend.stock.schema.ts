import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { ObjectIdColumn, ObjectID } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

@Schema()
export class RecommendStock {
  @Exclude()
  @ObjectIdColumn()
  _id: ObjectID;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  stockName: string;

  @Prop()
  stockCode: string;

  toJSON() {
    return instanceToPlain(this);
  }
}

export const RecommendStockSchema=SchemaFactory.createForClass(RecommendStock);
