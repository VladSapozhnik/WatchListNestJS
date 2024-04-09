import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Watchlist } from 'src/modules/watchlist/entities/watchlist.entity';
@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchlist: Watchlist[];
}
