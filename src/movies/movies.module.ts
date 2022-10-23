import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Movies } from './movies.entity';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movies])],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
