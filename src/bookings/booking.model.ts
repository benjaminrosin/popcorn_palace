import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, Default } from "sequelize-typescript";
import { ShowTime } from "../showtimes/showtimes.model";
import { DataTypes } from "sequelize";

@Table({ tableName: 'bookings' })
export class Booking extends Model {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id: string;

  @ForeignKey(() => ShowTime)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  showtimeId: Number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  seatNumber: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => ShowTime, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  showtime: ShowTime;

}