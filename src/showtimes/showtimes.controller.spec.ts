import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimesController } from './showtimes.controller';

describe('ShowtimesController', () => {
  let controller: ShowTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowTimesController],
    }).compile();

    controller = module.get<ShowTimesController>(ShowTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
