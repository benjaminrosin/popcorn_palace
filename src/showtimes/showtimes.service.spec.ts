import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimesService } from './showtimes.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { ShowTime } from "./showtimes.model";
import { ShowTimesController } from "./showtimes.controller";

describe('ShowtimesService', () => {
  let service: ShowTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forFeature([ShowTime])],
      controllers: [ShowTimesController],
      providers: [ShowTimesService],
    }).compile();

    service = module.get<ShowTimesService>(ShowTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
