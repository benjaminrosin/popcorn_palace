import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ShowTime } from "./shoetimes.model";


@Injectable()
export class ShowTimesService {
  constructor(@InjectModel(ShowTime) private showTimeDatabase: typeof ShowTime) {}

  async findAll() {
    return await this.showTimeDatabase.findAll();
  }

  async findOne(id: number) {
    return await this.showTimeDatabase.findOne({where: {id}});
  }

  async addShow(show: {}) {
    const addedShow = await this.showTimeDatabase.create(show);
    return addedShow
  }

  async updateShow(id: number, show: {}) {
    const [affectedCount] = await this.showTimeDatabase.update(show, { where: { id } });
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
