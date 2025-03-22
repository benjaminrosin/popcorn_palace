import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShowTimesModule } from './showtimes/showtimes.module';
import { DatabaseModule } from "./Database.module";

@Module({
  imports: [DatabaseModule, MoviesModule, ShowTimesModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
