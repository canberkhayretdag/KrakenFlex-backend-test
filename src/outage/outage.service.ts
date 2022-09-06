import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Outage, OutageDocument } from './schemas/outage.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PostOutageDTO } from './dtos/post-outage.dto';
import { SiteService } from '../site/site.service';
import { EnhancedOutageDocument } from './schemas/enhancedOutage.schema';

@Injectable()
export class OutageService {
  constructor(
    @InjectModel('Outage')
    private readonly outageModel: Model<OutageDocument>,
    @InjectModel('EnhancedOutage')
    private readonly enhancedOutageModel: Model<EnhancedOutageDocument>,
    private readonly siteService: SiteService,
  ) {}

  async getAllOutages(): Promise<Outage[]> {
    try {
      const outages = await this.outageModel
        .find({
          begin: { $lte: new Date('2022-01-01T00:00:00.000Z') },
        })
        .select(['-__v', '-_id'])
        .exec();
      const enhancedOutages = await this.enhancedOutageModel
        .find({
          begin: { $lte: new Date('2022-01-01T00:00:00.000Z') },
        })
        .select(['-name', '-__v', '-_id'])
        .exec();
      const result = outages.concat(enhancedOutages);
      return result;
    } catch (_err) {
      return null;
    }
  }

  async postOutages(
    siteId: string,
    postedOutages: PostOutageDTO[],
  ): Promise<boolean> {
    const site = await this.siteService.checkSite(siteId);
    if (!site) return false;
    const newPostedOutages = postedOutages.map((v) => ({
      ...v,
      siteInfoId: site,
    }));
    try {
      await this.enhancedOutageModel.insertMany(newPostedOutages);
      return true;
    } catch (error) {
      return false;
    }
  }
}
