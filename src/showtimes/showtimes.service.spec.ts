import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimesService } from './showtimes.service';

describe('ShowtimesService', () => {
  let service: ShowTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShowTimesService],
    }).compile();

    service = module.get<ShowTimesService>(ShowTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
