import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type CardProductDocument = CardProduct & Document;

@Schema({ timestamps: true })
class CardProduct {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  start_date: string;
}

export const CardProductSchema = SchemaFactory.createForClass(CardProduct);
