import { IsDefined, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

import { User } from '../user/user.entity';

export class MoviesCreate {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    readonly movie_name: string;

    @Exclude()
    owner: User;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    readonly rating: number;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    readonly genre: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    readonly cast: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    readonly release_date: Date;

}
