import { Test, TestingModule } from '@nestjs/testing';
import { PostOutageDTO } from './dtos/post-outage.dto';
import { OutageService } from './outage.service';

describe('OutageService', () => {
  let service: OutageService;

  class OutageServiceMock {
    getAllOutages() {
      return [];
    }

    postOutages() {
      return true;
    }
  }

  beforeEach(async () => {
    const OutageServiceProvider = {
      provide: OutageService,
      useClass: OutageServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutageService, OutageServiceProvider],
    }).compile();

    service = module.get<OutageService>(OutageService);
  });

  it('should be return outages as an array', async () => {
    const getAllOutages = jest.spyOn(service, 'getAllOutages');
    service.getAllOutages();
    expect(getAllOutages).toHaveBeenCalled();
  });

  it('should be return boolean', async () => {
    const postOutages = jest.spyOn(service, 'postOutages');
    const siteId = 'test';
    const dto = new PostOutageDTO();
    const dtos = [dto];
    service.postOutages(siteId, dtos);
    expect(postOutages).toHaveBeenCalled();
    expect(postOutages).toBeCalledWith(siteId, dtos);
  });
});
