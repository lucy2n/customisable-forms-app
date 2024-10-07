import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Question from './question';
import User from './user';


interface AnswerAttributes {
  id: number;
  question_id: number;
  user_id: number;
  answer: string | string[];
}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, 'id'> {}

class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> implements AnswerAttributes {
  public id!: number;
  public question_id!: number;
  public user_id!: number;
  public answer!: string | string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    question_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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

Answer.belongsTo(Question, { foreignKey: 'question_id' });
Answer.belongsTo(User, { foreignKey: 'user_id' });

export default Answer;