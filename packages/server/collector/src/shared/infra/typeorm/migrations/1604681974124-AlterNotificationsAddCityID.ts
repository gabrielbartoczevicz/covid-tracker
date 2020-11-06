import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export class AlterNotificationsAddCityID1604681974124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'notifications',
      new TableColumn({
        name: 'city_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'notifications',
      new TableForeignKey({
        name: 'NotificationsCity',
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cities',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('notifications', 'NotificationsCity');

    await queryRunner.dropColumn('notifications', 'city_id');
  }
}
