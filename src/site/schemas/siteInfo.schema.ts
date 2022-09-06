import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Device } from './device.schema';

export type SiteInfoDocument = SiteInfo & Document;

@Schema()
export class SiteInfo {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'SiteID' })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Device' })
  devices: Device[];
}

export const SiteInfoSchema = SchemaFactory.createForClass(SiteInfo);
