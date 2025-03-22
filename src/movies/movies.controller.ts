import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDTO, UpdateMovieDTO } from "./movie.DTO";

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // GET    /movies/all
  @Get('all')
  async findAll() {
    return this.moviesService.findAll();
  }

  // POST   /movies
  @Post()
  async addMovie(@Body() movie: CreateMovieDTO){
    return this.moviesService.addMovie(movie);
  }

  // POST   /movies/update/:title
  @Post('update/:title')
  updateMovie(@Param('title') title: string, @Body() movie: UpdateMovieDTO) {

    return this.moviesService.updateMovie(title, movie);
  }

  // DELETE /movies/:title
  @Delete(':title')
  deleteMovie(@Param('title') title: string) {
    return this.moviesService.deleteMovie(title);
  }

  // need to handel other routs
}
