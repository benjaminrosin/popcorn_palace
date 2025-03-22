import { Injectable } from '@nestjs/common';
import { Booking } from "./booking.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateBooking } from "./booking.DTO";

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking) private bookingModel: typeof Booking) {}

  async findAll(){
    return await this.bookingModel.findAll();
  }

  async addBooking(booking: CreateBooking) {
    //need to check if seat available

    const added = await this.bookingModel.create({...booking});
    return {bookingId: added.id};
  }
}