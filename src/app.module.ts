import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShowtimesModule } from './showtimes/showtimes.module';

@Module({
  imports: [SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './database.sqlite',
      autoLoadModels: true,
      synchronize: true,
    }),
    MoviesModule,
    ShowtimesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
