import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryColumn({ comment: 'id' })
  id: number;

  @Column({ type: 'varchar', comment: 'Name of the task.' })
  name: string;

  @Column({ comment: 'Whether the task is done or not.' })
  done: boolean;
}
