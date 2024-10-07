import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Template from './template';

interface QuestionAttributes {
  id: number;
  text: string;
  type: string;
  template_id: number;
  options: string[];
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> {}

class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  public id!: number;
  public text!: string;
  public type!: string;
  public template_id!: number;
  public options!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    template_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Template,
        key: 'id',
      },
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'questions',
  }
);

Question.belongsTo(Template, { foreignKey: 'template_id' });
Template.hasMany(Question, { foreignKey: 'template_id' });

export default Question;