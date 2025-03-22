import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { Request } from "express";
import { CreateBooking } from "./booking.DTO";

interface RequestWithUser extends Request {
  user?: {
    id: string;
  };
}

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  getAllBookings() {
    return this.bookingsService.findAll();
  }


  @Post()
  addBooking(@Body()booking:CreateBooking) {
    return this.bookingsService.addBooking(booking);
  }

}
