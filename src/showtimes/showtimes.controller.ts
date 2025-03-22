import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, ValidationPipe } from "@nestjs/common";
import { ShowTimesService } from "./showtimes.service"
import { CreateShowtimeDTO, UpdateShowtimeDTO } from "./showTime.DTO";

@Controller('showtimes')
export class ShowTimesController {
  constructor(private readonly showTimesService: ShowTimesService) {}

  @Get('all') // GET  /showtimes/all
  async findAll() {
    return this.showTimesService.findAll();
  }

  @Get(':showtimeId') // GET  /showtimes/{showtimeId}
  async findOne(@Param('showtimeId', ParseIntPipe) showtimeId: number) {
    return this.showTimesService.findOne(showtimeId);
  }

  @Post() // POST /showtimes
  @HttpCode(200)
  async addShow(@Body(ValidationPipe) show: CreateShowtimeDTO){
    return this.showTimesService.addShow(show);
  }

  @Post('update/:showtimeId') // POST /showtimes/update/{showtimeId}
  @HttpCode(200)
  updateShow(@Param('showtimeId', ParseIntPipe) showtimeId: number, @Body(ValidationPipe) show: UpdateShowtimeDTO) {
    return this.showTimesService.updateShow(showtimeId, show);
  }

  @Delete(':showtimeId')  // DELETE /showtimes/{showtimeId}
  deleteShow(@Param('showtimeId', ParseIntPipe) showtimeId: number) {
    return this.showTimesService.deleteShow(+showtimeId);
  }

}
