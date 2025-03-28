import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { ShowTime } from "../showtimes/showtimes.model";

@Table({ tableName: 'movies' })
export class Movie extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  genre: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  duration: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  rating: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  releaseYear: number;

  @HasMany(() => ShowTime)
  showtimes: ShowTime[];
}
