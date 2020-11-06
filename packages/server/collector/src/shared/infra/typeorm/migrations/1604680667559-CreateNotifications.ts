import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNotifications1604680667559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notifications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'epi_week',
            type: 'integer',
          },
          {
            name: 'notifications',
            type: 'bigint',
          },
          {
            name: 'deaths',
            type: 'bigint',
          },
          {
            name: 'recovered',
            type: 'bigint',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notifications');
  }
}
