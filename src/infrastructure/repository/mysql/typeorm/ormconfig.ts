import { resolve } from 'path';

import { ConnectionOptions } from 'typeorm';

import '../../../../load-env';

export default <ConnectionOptions>{
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [resolve(__dirname, './entity/*.entity{.ts,.js}')],
  migrations: [resolve(__dirname, './migrations/*.ts')],
  seeds: [resolve(__dirname, './seeds/**/*.seed.ts')],
  cli: {
    migrationsDir: resolve(__dirname, './migrations'),
  },
};
