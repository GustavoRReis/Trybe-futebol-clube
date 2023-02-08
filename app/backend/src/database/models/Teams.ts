import { DataTypes, Model } from 'sequelize';
import connection from '.';

export default class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'team_name',
    },
  },
  {
    sequelize: connection,
    tableName: 'teams',
    timestamps: false,
    underscored: true,
  },
);
