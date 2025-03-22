import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Booking } from "./booking.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateBooking } from "./booking.DTO";
import { ForeignKeyConstraintError } from "sequelize";

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking) private bookingDatabase: typeof Booking) {}

  async findAll(){
    return await this.bookingDatabase.findAll({attributes: { exclude: ['createdAt', 'updatedAt'] }});
  }

  async addBooking(booking: CreateBooking) {
    //need to check if seat available
    const currShow = (await this.bookingDatabase.findAll({
      where: {showtimeId: booking.showtimeId}}));

    const takenSeats = currShow.map(seat => seat.seatNumber);

    if (takenSeats.includes(booking.seatNumber)) {
      throw new BadRequestException('seat number ' + booking.seatNumber + ' already taken');
    }

    try{
      const added = await this.bookingDatabase.create({...booking});
      return {bookingId: added.id};
    }
    catch(error){
      if (error instanceof ForeignKeyConstraintError) {
        throw new NotFoundException("cannot find show time for this booking");
      }
      throw error;
    }

  }
}