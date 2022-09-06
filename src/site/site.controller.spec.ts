import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { SiteInfo } from './schemas/siteInfo.schema';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';

describe('SiteController', () => {
  let controller: SiteController;

  const mockSiteService = {
    getSiteInfo: jest.fn((siteId) => {
      return {
        id: 'test',
        name: 'test',
        devices: [],
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteController],
      providers: [SiteService],
    })
      .overrideProvider(SiteService)
      .useValue(mockSiteService)
      .compile();

    controller = module.get<SiteController>(SiteController);
  });

  it('should be return site info', async () => {
    expect(await controller.getSite('test')).toEqual({
      id: 'test',
      name: 'test',
      devices: [],
    });
  });
});
