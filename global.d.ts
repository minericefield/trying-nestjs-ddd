declare namespace NodeJS {
  interface ProcessEnv {
    readonly REPOSITORY_TYPE: 'in-memory' | 'mysql-typeorm';
  }
}
