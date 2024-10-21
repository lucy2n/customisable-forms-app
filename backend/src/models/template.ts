import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Question from './question';

interface ModelWithAssociations extends Model {
  associate?: () => void;
}

class Template extends Model implements ModelWithAssociations {
  public id!: string;
  public title!: string;
  public description!: string;
  public user_id!: number;
  public questions?: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    const User = require('./user').default;
    const Form = require('./form').default;
    const Question = require('./question').default;
    const Like = require('./like').default;

    Template.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Template.hasMany(Form, { foreignKey: 'template_id', as: 'forms', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Template.hasMany(Question, { foreignKey: 'template_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Template.hasMany(Like, { foreignKey: 'template_id', as: 'likes', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  }
}

Template.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
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
