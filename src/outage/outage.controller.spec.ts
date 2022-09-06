import { Test, TestingModule } from '@nestjs/testing';
import { PostOutageDTO } from './dtos/post-outage.dto';
import { OutageController } from './outage.controller';
import { OutageService } from './outage.service';

describe('OutageController', () => {
  let controller: OutageController;

  const mockOutageService = {
    getAllOutages: jest.fn(() => {
      return [];
    }),
    postOutages: jest.fn(() => {
      return [];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutageController],
      providers: [OutageService],
    })
      .overrideProvider(OutageService)
      .useValue(mockOutageService)
      .compile();

    controller = module.get<OutageController>(OutageController);
  });

  it('should be return outages as an array', async () => {
    expect(await controller.getOutages()).toEqual([]);
  });

  it('should be return outages as an array', async () => {
    const siteId = 'test';
    const dto = new PostOutageDTO();
    const dtos = [dto];
    expect(await controller.postOutages(siteId, dtos)).toEqual([]);
  });
});
