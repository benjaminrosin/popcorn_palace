import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  // GET    /movies/all
  @Get('all')
  findAll() {
    return Promise.resolve([]);
    // returns arr of all movies
  }

  // POST   /movies
  @Post()
  addMovie(@Body() movie: {}){
    return Promise.resolve({})
    // returns json of the new movie added
  }

  // POST   /movies/update/:title
  @Post('update/:title')
  updateMovie(@Param('title') title: string, @Body() movie: {}) {
    return Promise.resolve({})
    // returns 200
  }

  // DELETE /movies/:title
  @Delete(':title')
  deleteMovie(@Param('title') title: string) {
    return Promise.resolve({})
    // returns 200
  }

  // need to handel other routs
}
