import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

interface TemplateAttributes {
  id: number;
  title: string;
  description: string;
  user_id: number;
}

interface TemplateCreationAttributes extends Optional<TemplateAttributes, 'id'> {}

class Template extends Model<TemplateAttributes, TemplateCreationAttributes> implements TemplateAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Template.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'templates',
  }
);

Template.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Template, { foreignKey: 'user_id' });

export default Template;