import { Body, Controller, Delete, Get, HttpCode, Param, Post, ValidationPipe } from "@nestjs/common";
import { MoviesService } from './movies.service';
import { CreateMovieDTO, UpdateMovieDTO } from "./movie.DTO";

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('all')  // GET  /movies/all
  async findAll() {
    return this.moviesService.findAll();
  }

  @Post() // POST /movies
  @HttpCode(200)
  async addMovie(@Body(ValidationPipe) movie: CreateMovieDTO){
    return this.moviesService.addMovie(movie);
  }

  @Post('update/:title')  // POST /movies/update/{title}
  @HttpCode(200)
  updateMovie(@Param('title') title: string, @Body(ValidationPipe) movie: UpdateMovieDTO) {
    return this.moviesService.updateMovie(title, movie);
  }

  @Delete(':title') // DELETE /movies/{title}
  deleteMovie(@Param('title') title: string) {
    return this.moviesService.deleteMovie(title);
  }

}
