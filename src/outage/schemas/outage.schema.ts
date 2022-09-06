import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type OutageDocument = Outage & Document;

@Schema()
export class Outage {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Device' })
  id: string;

  @Prop({ required: true })
  siteInfoId: string;

  @Prop({ required: true })
  begin: Date;

  @Prop({ required: true })
  end: Date;
}

export const OutageSchema = SchemaFactory.createForClass(Outage);
