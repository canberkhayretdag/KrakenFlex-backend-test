import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SiteID } from './schemas/siteId.schema';
import { SiteInfo } from './schemas/siteInfo.schema';
import { SiteService } from './site.service';

describe('SiteService', () => {
  let service: SiteService;

  class SiteServiceMock {
    getSiteInfo() {
      return {};
    }

    checkSite() {
      return SiteID;
    }

    getSite() {
      return 0;
    }
  }

  beforeEach(async () => {
    const SiteServiceProvider = {
      provide: SiteService,
      useClass: SiteServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteService, SiteServiceProvider],
    }).compile();

    service = module.get<SiteService>(SiteService);
  });

  it('should be return site info', async () => {
    const getSiteInfo = jest.spyOn(service, 'getSiteInfo');
    const siteId = 'test';
    service.getSiteInfo(siteId);
    expect(getSiteInfo).toHaveBeenCalled();
    expect(getSiteInfo).toHaveBeenCalledWith(siteId);
  });

  it('should be return boolean', async () => {
    const checkSite = jest.spyOn(service, 'checkSite');
    const siteId = 'test';
    service.checkSite(siteId);
    expect(checkSite).toHaveBeenCalled();
    expect(checkSite).toHaveBeenCalledWith(siteId);
  });

  it('should be return site ID', async () => {
    const getSite = jest.spyOn(service, 'getSite');
    const siteId = 'test';
    service.getSite(siteId);
    expect(getSite).toHaveBeenCalled();
    expect(getSite).toHaveBeenCalledWith(siteId);
  });
});
