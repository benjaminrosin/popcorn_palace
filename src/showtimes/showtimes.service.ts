import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ShowTime } from "./showtimes.model";
import { CreateShowtimeDTO, UpdateShowtimeDTO } from "./showTime.DTO";
import { ForeignKeyConstraintError } from "sequelize";

@Injectable()
export class ShowTimesService {
  constructor(@InjectModel(ShowTime) private showTimeDatabase: typeof ShowTime) {}

  async findAll() {
    return await this.showTimeDatabase.findAll({attributes: { exclude: ['createdAt', 'updatedAt'] }});
  }

  async findOne(id: number) {
    const showTime =  await this.showTimeDatabase.findOne({
      where: {id},
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!showTime){
      throw new NotFoundException("cannot found show time with id " + id);
    }
    return showTime;
  }

  async addShow(show: CreateShowtimeDTO)
  {
    const theater = await this.showTimeDatabase.findAll({
      where: {theater: show.theater},
    });

    if (theater.some(scheduledShow =>
      this.overlappingTimes(scheduledShow, show))){
      throw new BadRequestException("time overlap");
    }

    try{
      return await this.showTimeDatabase.create({...show});
    }
    catch (error) {
      if (error instanceof ForeignKeyConstraintError) {
        throw new NotFoundException("cannot find movie for this show time");
      }
      throw error;
    }
  }

  async updateShow(id: number, show: UpdateShowtimeDTO) {
    const [affectedCount] = await this.showTimeDatabase.update({...show}, { where: { id } });
    if (!affectedCount) {
      throw new NotFoundException("cannot update showtime with id " + id);
    }
    return;
  }

  async deleteShow(id: number) {
    const affectedCount = await this.showTimeDatabase.destroy({ where: { id } });
    if (!affectedCount) {
      throw new NotFoundException("cannot delete showtime with id " + id);
    }
    return;
  }

  private overlappingTimes(showA: ShowTime, showB: CreateShowtimeDTO) :boolean {
    const aStart = new Date(showA.startTime);
    const aEnd = new Date(showA.endTime);
    const bStart = new Date(showB.startTime);
    const bEnd = new Date(showB.endTime);

    return aStart < bEnd && bStart < aEnd;
  }
}
