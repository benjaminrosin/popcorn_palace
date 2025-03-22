import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Movie } from "./movie.model";
import { CreateMovieDTO, UpdateMovieDTO } from "./movie.DTO";
import { ValidationError } from "sequelize";

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie) private movieDatabase: typeof Movie) {}

  async findAll() {
    return await this.movieDatabase.findAll({attributes: { exclude: ['createdAt', 'updatedAt'] }});
  }

  async addMovie(movie: CreateMovieDTO) {
    try{
      return await this.movieDatabase.create({...movie});
    }
    catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(error.errors[0].message);
      }
      throw error;
    }
  }

  async updateMovie(title: string, movie: UpdateMovieDTO) {
    const [affectedCount] = await this.movieDatabase.update({...movie}, { where: { title } });
    if (!affectedCount) {
      throw new NotFoundException("cannot update movie named " + title);
    }
    return;
  }

  async deleteMovie(title: string) {
    const affectedCount = await this.movieDatabase.destroy({ where: { title } });
    if (!affectedCount) {
      throw new NotFoundException("cannot delete movie named " + title);
    }
    return;
  }
}
