import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Template from './template';
import User from './user';

class Like extends Model {
  public id!: string;
  public user_id!: number;
  public template_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Like.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Like.belongsTo(Template, { foreignKey: 'template_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  }
}

Like.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    template_id: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'likes',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  }
);

export default Like;