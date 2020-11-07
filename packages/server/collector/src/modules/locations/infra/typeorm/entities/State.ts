import {
  BeforeInsert,
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('states')
class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  beforeInsert(): void {
    this.id = uuid();
  }
}

export default State;
