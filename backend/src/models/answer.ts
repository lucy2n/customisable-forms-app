import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Question from './question';
import User from './user';
import Form from './form';


interface AnswerAttributes {
  id: string;
  question_id: string;
  user_id: number;
  form_id: string,
  answer: string | string[];
}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, 'id'> {}

class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> implements AnswerAttributes {
  public id!: string;
  public question_id!: string;
  public user_id!: number;
  public form_id!: string;
  public answer!: string | string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Answer.belongsTo(Form, { foreignKey: 'form_id', as: 'form' });
  }
}

Answer.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    question_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Question,
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    form_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Form,
        key: 'id',
      },
    },
    answer: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'answers',
  }
);

export default Answer;