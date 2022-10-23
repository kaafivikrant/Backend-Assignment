import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  
  import { User } from '../user/user.entity';
  
  @Entity()
  export class Movies {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    movie_name: string;
  
    @Column()
    rating: number;

    @Column()
    genre: string;

    @Column()
    cast: string;

    @Column()
    release_date: Date;
  
    @ManyToOne(type => User, { nullable: false, onDelete: 'RESTRICT' })
    @Exclude()
    owner: User | number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  