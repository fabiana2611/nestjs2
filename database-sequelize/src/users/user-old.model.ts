import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class UserOldModel extends Model {
  @Column
  completeName: string;
}
