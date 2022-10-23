import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

import { User } from '../user/user.entity';

export class MoviesUpdate {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    readonly movie_name: string;

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
