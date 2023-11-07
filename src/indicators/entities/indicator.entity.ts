import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('indicators')
export class Indicator {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  indicator: number;

  @Column()
  variable: number;

  @Column()
  turbineId: number;

  @Column()
  timestamp: Date;
}
