import { DataSourceOptions, DataSource } from 'typeorm';

import { CreateUser1557166726050 } from './migrations/1557166726050-CreateUser';
import { CreateProfile1570141220019 } from './migrations/1570141220019-CreateProfile';
import { CreateSessionStorage1584985637890 } from './migrations/1584985637890-CreateSessionStorage';
import { CreateTodo1597106889894 } from './migrations/1597106889894-CreateTodo';
import { Movies } from './movies/movies.entity';
import { Profile } from './user/profile.entity';
import { User } from './user/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Profile, Movies],
  migrations: [
    CreateUser1557166726050,
    CreateProfile1570141220019,
    CreateSessionStorage1584985637890,
    CreateTodo1597106889894,
  ],
  synchronize: true,
  extra: {
    ssl:
      process.env.SSL_MODE === 'require'
        ? {
            rejectUnauthorized: false,
          }
        : false,
  },
};

export const appDataSource = new DataSource(dataSourceOptions);
