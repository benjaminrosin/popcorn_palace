import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Movie } from "../movies/movie.model";

@Table({ tableName: 'showTimes' })
export class ShowTime extends Model {
  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  movieId: Number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  theater: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startTime: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endTime: Date;

  @BelongsTo(() => Movie, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  movie: Movie;

}

//movieId