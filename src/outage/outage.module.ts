import { Module } from '@nestjs/common';
import { OutageService } from './outage.service';
import { OutageController } from './outage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OutageSchema } from './schemas/outage.schema';
import { SiteModule } from '../site/site.module';
import { EnhancedOutageSchema } from './schemas/enhancedOutage.schema';

@Module({
  imports: [
    SiteModule,
    MongooseModule.forFeature([
      { name: 'Outage', schema: OutageSchema },
      { name: 'EnhancedOutage', schema: EnhancedOutageSchema },
    ]),
  ],
  providers: [OutageService],
  controllers: [OutageController],
})
export class OutageModule {}
