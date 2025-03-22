import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ShowTime } from "./showtimes.model";
import { Movie } from "../movies/movie.model";
import { CreateShowtimeDTO, UpdateShowtimeDTO } from "./showTime.DTO";



@Injectable()
export class ShowTimesService {
  constructor(
    @InjectModel(ShowTime) private showTimeDatabase: typeof ShowTime,
    @InjectModel(Movie) private MovieDatabase: typeof Movie,
    ) {}

  async findAll() {
    return await this.showTimeDatabase.findAll();
  }

  async findOne(id: number) {
    const showTime =  await this.showTimeDatabase.findOne({where: {id}});
    if (!showTime){
      throw new NotFoundException("cannot found show time with id " + id);
    }
    return showTime;
  }

  async addShow(show: CreateShowtimeDTO)
  {
    const movie = this.MovieDatabase.findOne({where:{id: show.movieId}});//not working
    if (!movie) {
      throw new NotFoundException("movie not found");
    }

    return  await this.showTimeDatabase.create({...show});
  }

  async updateShow(id: number, show: UpdateShowtimeDTO) {
    const [affectedCount] = await this.showTimeDatabase.update({...show}, { where: { id } });
    if (!affectedCount) {
      throw new NotFoundException("cannot update showtime with id " + id);
    }
    return Promise.resolve()
  }

  async deleteShow(id: number) {
    const affectedCount = await this.showTimeDatabase.destroy({ where: { id } });
    if (!affectedCount) {
      throw new NotFoundException("cannot delete showtime with id " + id);
    }
    return Promise.resolve();
  }
}
