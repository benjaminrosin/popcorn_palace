import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './movies/movie.model';
import { ShowTime } from './showtimes/showtimes.model';
import { Booking } from "./bookings/booking.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: process.env.NODE_ENV === 'test' ? ':memory:' : 'database.sqlite',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Movie, ShowTime, Booking]),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
