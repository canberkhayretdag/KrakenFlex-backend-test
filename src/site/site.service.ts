import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { SiteID, SiteIDDocument } from './schemas/siteId.schema';
import { SiteInfo, SiteInfoDocument } from './schemas/siteInfo.schema';

@Injectable()
export class SiteService {
  constructor(
    @InjectModel('SiteInfo')
    private readonly siteInfoModel: Model<SiteInfoDocument>,
    @InjectModel('SiteID')
    private readonly siteIDModel: Model<SiteIDDocument>,
    @InjectModel('Device')
    private readonly deviceModel: Model<DeviceDocument>,
  ) {}

  async getSite(siteId: string): Promise<SiteID> {
    const siteID = await this.siteIDModel.findOne({ id: siteId }).exec();
    if (!siteID) return null;
    return siteID._id;
  }

  async checkSite(siteId: string): Promise<SiteID> {
    const site = await this.siteIDModel.findOne({ id: siteId }).exec();
    if (!site) return null;
    return site._id;
  }

  async getSiteInfo(siteId: string): Promise<SiteInfo> {
    const siteID = await this.getSite(siteId);
    try {
      const siteInfo = await this.siteInfoModel
        .findOne({ _id: siteID })
        .populate('devices')
        .exec();
      return siteInfo;
    } catch (_err) {
      return null;
    }
  }
}
