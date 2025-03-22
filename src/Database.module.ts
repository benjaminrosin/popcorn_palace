import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './movies/movie.model';
import { ShowTime } from './showtimes/showtimes.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'database.sqlite',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Movie, ShowTime]),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
