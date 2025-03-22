import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ShowTimesService } from "./showtimes.service"

@Controller('showtimes')
export class ShowTimesController {
  constructor(private readonly showTimesService: ShowTimesService) {}

  // GET /showtimes/all
  @Get('all')
  async findAll() {
    return this.showTimesService.findAll();
  }

  // GET /showtimes/{showtimeId}
  @Get(':showtimeId')
  async findOne(@Param('showtimeId') showtimeId: string) {
    return this.showTimesService.findOne(+showtimeId);
  }

  // POST /showtimes
  @Post()
  async addShow(@Body() show: {}){
    return this.showTimesService.addShow(show);
  }

  // POST /showtimes/update/{showtimeId}
  @Post('update/:showtimeId')
  updateShow(@Param('showtimeId') showtimeId: string, @Body() show: {}) {

    return this.showTimesService.updateShow(+showtimeId, show);
  }

  // DELETE /showtimes/{showtimeId}
  @Delete(':showtimeId')
  deleteShow(@Param('showtimeId') showtimeId: string) {
    return this.showTimesService.deleteShow(+showtimeId);
  }

}
