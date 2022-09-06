import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type EnhancedOutageDocument = EnhancedOutage & Document;

@Schema()
export class EnhancedOutage {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Device' })
  id: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'SiteInfo' })
  siteInfoId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  begin: Date;

  @Prop({ required: true })
  end: Date;
}

export const EnhancedOutageSchema =
  SchemaFactory.createForClass(EnhancedOutage);
