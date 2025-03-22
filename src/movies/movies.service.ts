import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Movie } from "./movie.model";

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie) private movieDatabase: typeof Movie) {
  }

  async findAll() {
    return await this.movieDatabase.findAll();
  }

  async addMovie(movie: {}) {
    const addedMovie = await this.movieDatabase.create(movie);
    return addedMovie
  }

  async updateMovie(title: string, movie: {}) {
    const [affectedCount] = await this.movieDatabase.update(movie, { where: { title } });
    if (!affectedCount) {
      throw new NotFoundException("cannot update movie named " + title);
    }
    return Promise.resolve()
  }

  async deleteMovie(title: string) {
    const affectedCount = await this.movieDatabase.destroy({ where: { title } });
    if (!affectedCount) {
      throw new NotFoundException("cannot delete movie named " + title);
    }
    return Promise.resolve();
  }
}
