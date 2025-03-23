import { Module } from '@nestjs/common';
import { ShowTimesController } from './showtimes.controller';
import { ShowTimesService } from './showtimes.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { ShowTime } from "./showtimes.model";

@Module({
  imports: [SequelizeModule.forFeature([ShowTime])],
  controllers: [ShowTimesController],
  providers: [ShowTimesService],
  exports: [ShowTimesService],
})
export class ShowTimesModule {}
