import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export class AlterCitiesAddStateID1604680237512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cities',
      new TableColumn({
        name: 'state_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'cities',
      new TableForeignKey({
        name: 'CitiesState',
        columnNames: ['state_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'states',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cities', 'CitiesState');

    await queryRunner.dropColumn('cities', 'state_id');
  }
}
