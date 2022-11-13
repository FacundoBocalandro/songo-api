import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum Genres {
  DEEP_HOUSE = 'deep_house',
  TECH_HOUSE = 'tech_house',
  MELODIC_TECHNO = 'melodic_techno',
  PROGRESSIVE = 'progressive',
  TECHNO_PEAK_TIME = 'techno_peak_time',
  HARD_TECHNO = 'hard_techno',
  MINIMAL = 'minimal',
  TRANCE = 'trance'
}

@Entity()
export class Track {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false, type: 'float'})
  durationInSeconds: number;

  @Column({nullable: false, type: 'float'})
  bitrate: number;

  @Column({nullable: false, type: 'text'})
  predictedGenre: Genres;
}
