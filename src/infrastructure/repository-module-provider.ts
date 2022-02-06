import { InMemoryRepositoryModule } from './in-memory/module';
import { MysqlTypeormModule } from './mysql/typeorm/module';

// TODO : Find a better way.
export default process.env.REPOSITORY_TYPE === 'in-memory'
  ? InMemoryRepositoryModule
  : MysqlTypeormModule; //  Currently using mysql and typeorm.
