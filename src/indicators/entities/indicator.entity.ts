import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('indicators')
export class Indicator {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  indicator: number;

  @Column()
  variable: number;

  @Column()
  turbineId: number;

  @Column()
  timestamp: Date;
}
