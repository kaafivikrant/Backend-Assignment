import {
    Controller,
    Post,
    UseGuards,
    Body,
    Get,
    Param,
    ParseIntPipe,
    UseInterceptors,
    ClassSerializerInterceptor,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
    Patch,
  } from '@nestjs/common';
  
  import { MoviesService } from './movies.service';
  import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { SessionAuthGuard } from '../auth/guards/session-auth.guard';
  import { MoviesCreate } from './movies-create.dto';
  import { AuthUser } from '../user/user.decorator';
  import { User } from '../user/user.entity';
  import { Movies } from './movies.entity';
  import { MoviesUpdate } from './movies-update.dto';
  
  @Controller('movies')
  @UseGuards(SessionAuthGuard, JWTAuthGuard)
  export class MoviesController {
    constructor(private readonly service: MoviesService) {}
  
    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    createMovies(
      @Body() newMovies: MoviesCreate,
      @AuthUser() user: User,
    ): Promise<Movies> {
      newMovies.owner = user;
  
      return this.service.createMovies(newMovies);
    }
  
    @Get()
    listMovies(@AuthUser() user: User): Promise<Movies[]> {
      return this.service.listMovies(user);
    }
  
    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async getMovies(
      @Param('id', ParseIntPipe) id: number,
      @AuthUser() user: User,
    ): Promise<Movies> {
      return this.service.getMovies(id, user);
    }
  
    @Put(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async updateMovies(
      @Param('id', ParseIntPipe) id: number,
      @Body() updates: MoviesUpdate,
      @AuthUser() user: User,
    ): Promise<Movies> {
      const movies = await this.service.getMovies(id, user);
  
      return this.service.updateMovies(movies, updates);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeMovies(
      @Param('id', ParseIntPipe) id: number,
      @AuthUser() user: User,
    ): Promise<Movies> {
      const movies = await this.service.getMovies(id, user);
  
      return this.service.removeMovies(movies);
    }
  
  }
  