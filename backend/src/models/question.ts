import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Form from './form';  // Импорт модели Form

interface QuestionAttributes {
  id: number;
  text: string;
  type: string;
  form_id: number;
  options?: string[];
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> {}

class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  public id!: number;
  public text!: string;
  public type!: string;
  public form_id!: number;
  public options?: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Ассоциации
  static associate() {
    Question.belongsTo(Form, { foreignKey: 'form_id', as: 'form' });
  }
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    form_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Form,  // Связываемся с моделью Form
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true,  // Опции нужны не для всех типов вопросов
    },
  },
  {
    sequelize,
    tableName: 'questions',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  }
);

// Экспорт модели
export default Question;
