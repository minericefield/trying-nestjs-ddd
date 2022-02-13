import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTaskTable1644119291455 implements MigrationInterface {
  name = 'CreateTaskTable1644119291455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`task\` (\`id\` int NOT NULL COMMENT 'id', \`name\` varchar(255) NOT NULL COMMENT 'Name of the task.', \`done\` tinyint NOT NULL COMMENT 'Whether the task is done or not.', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`task\``);
  }
}
