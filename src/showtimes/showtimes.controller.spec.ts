import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimesController } from './showtimes.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { ShowTime } from "./showtimes.model";

describe('ShowtimesController', () => {
  let controller: ShowTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forFeature([ShowTime])],
      controllers: [ShowTimesController],
    }).compile();

    controller = module.get<ShowTimesController>(ShowTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
