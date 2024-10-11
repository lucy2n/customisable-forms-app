import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Template from './template';  // Импорт модели Template
import User from './user';  // Импорт модели User
import Question from './question';  // Импорт модели Question

interface FormAttributes {
  id: number;
  template_id: number;
  user_id: number;
  questions?: Question[];
}

interface FormCreationAttributes extends Optional<FormAttributes, 'id'> {}

class Form extends Model<FormAttributes, FormCreationAttributes> implements FormAttributes {
  public id!: number;
  public template_id!: number;
  public user_id!: number;
  public questions?: Question[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Ассоциации с другими моделями
  static associate() {
    Form.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    Form.belongsTo(Template, { foreignKey: 'template_id', as: 'template' });
    Form.hasMany(Question, { foreignKey: 'form_id', as: 'questions', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  }
}

Form.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Template,  // Используем модель Template
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,  // Используем модель User
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'forms',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  }
);

// Экспорт модели
export default Form;
