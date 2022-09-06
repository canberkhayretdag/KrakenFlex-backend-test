import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteInfoSchema } from './schemas/siteInfo.schema';
import { SiteIDSchema } from './schemas/siteId.schema';
import { DeviceSchema } from './schemas/device.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SiteInfo', schema: SiteInfoSchema },
      { name: 'SiteID', schema: SiteIDSchema },
      { name: 'Device', schema: DeviceSchema },
    ]),
  ],
  providers: [SiteService],
  controllers: [SiteController],
  exports: [SiteService],
})
export class SiteModule {}
