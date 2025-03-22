import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'showTimes' })
export class ShowTime extends Model {
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

}

//movieId