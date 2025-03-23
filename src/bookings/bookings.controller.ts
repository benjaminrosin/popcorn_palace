import { Body, Controller, Get, HttpCode, Post, ValidationPipe } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBooking } from "./booking.DTO";

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('all')  // GET  /bookings/all
  getAllBookings() {
    return this.bookingsService.findAll();
  }

  @Post() // POST /bookings
  @HttpCode(200)
  addBooking(@Body(ValidationPipe)booking:CreateBooking) {
    return this.bookingsService.addBooking(booking);
  }

}
