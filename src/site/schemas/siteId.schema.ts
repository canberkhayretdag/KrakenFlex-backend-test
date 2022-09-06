import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SiteIDDocument = SiteID & Document;

@Schema()
export class SiteID {
  @Prop()
  id: string;
}

export const SiteIDSchema = SchemaFactory.createForClass(SiteID);
