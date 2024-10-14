import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Template from './template';

interface QuestionAttributes {
  id: string;
  text: string;
  type: string;
  template_id: string;
  options?: string[];
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> {}

class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  public id!: string;
  public text!: string;
  public type!: string;
  public template_id!: string;
  public options?: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Ассоциации
  static associate() {
    Question.belongsTo(Template, { foreignKey: 'template_id', as: 'template' });
  }
}

Question.init(
  {
    id: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Template,  // Связываемся с моделью Form
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
