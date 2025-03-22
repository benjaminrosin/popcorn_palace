import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ShowTimesModule } from './showtimes/showtimes.module';
import { DatabaseModule } from "./Database.module";
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [DatabaseModule, MoviesModule, ShowTimesModule, BookingsModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
