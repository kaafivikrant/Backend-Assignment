import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movies } from './movies.entity';
import { MoviesCreate } from './movies-create.dto';
import { User } from '../user/user.entity';
import { MoviesUpdate } from './movies-update.dto';
  
  @Injectable()
  export class MoviesService {
    constructor(
      @InjectRepository(Movies)
      private readonly repo: Repository<Movies>,
    ) {}
  
    createMovies(newMovies: MoviesCreate): Promise<Movies> {
      const movies = this.repo.create(newMovies);
      return this.repo.save(movies);
    }
  
    listMovies(owner: User): Promise<Movies[]> {
      return this.repo.find({
        where: { owner: { id: owner.id } },
        order: { createdAt: 'DESC' },
      });
    }
  
    async getMovies(id: number, owner: User): Promise<Movies> {
      const movies = await this.repo.findOne({
        where: { id },
        loadRelationIds: true,
      });
  
      if (!movies) throw new NotFoundException(`Not found any movies with id: ${id}`);
  
      if (movies.owner !== owner.id)
        throw new ForbiddenException(`Movies does not belong to you`);
  
      return movies;
    }
  
    updateMovies(movies: Movies, updates: MoviesUpdate): Promise<Movies> {
      this.repo.merge(movies, updates);
  
      return this.repo.save(movies);
    }
  
    removeMovies(movies: Movies): Promise<Movies> {
      return this.repo.remove(movies);
    }
  }
  