import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface ModelWithAssociations extends Model {
  associate?: () => void;
}

class Template extends Model implements ModelWithAssociations {
  public id!: number;
  public title!: string;
  public user_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    const User = require('./user').default;
    const Form = require('./form').default;
    const Question = require('./question').default;

    Template.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Template.hasMany(Form, { foreignKey: 'template_id', as: 'forms', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Template.hasMany(Question, { foreignKey: 'template_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  }
}

Template.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'templates',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  }
);

export default Template;
