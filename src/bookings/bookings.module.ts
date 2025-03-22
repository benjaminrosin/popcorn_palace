import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Booking } from "./booking.model";

@Module({
  imports: [ SequelizeModule.forFeature([Booking])],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [ BookingsService],
})
export class BookingsModule {}
