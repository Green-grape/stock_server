import { Schema, Prop } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose/dist';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { ObjectID, ObjectIdColumn } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

export type StockDataDocument = HydratedDocument<StockData>;

@Schema()
export class StockData {
  @Exclude()
  @ObjectIdColumn()
  _id: ObjectID;

  @Prop()
  date: number;

  @Prop()
  open: number;

  @Prop()
  high: number;

  @Prop()
  low: number;

  @Prop()
  volume: number;

  toJSON() {
    return instanceToPlain(this);
  }
}

export const StockDataSchema = SchemaFactory.createForClass(StockData);
