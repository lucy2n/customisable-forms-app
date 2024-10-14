import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Template from './template';
import User from './user';
import Answer from './answer';

interface FormAttributes {
  id: string;
  template_id: string;
  user_id: number;
  answers?: Answer[];
}

interface FormCreationAttributes extends Optional<FormAttributes, 'id'> {}

class Form extends Model<FormAttributes, FormCreationAttributes> implements FormAttributes {
  public id!: string;
  public template_id!: string;
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Form.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    Form.belongsTo(Template, { foreignKey: 'template_id', as: 'template' });
  }
}

Form.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    template_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Template,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
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

export default Form;
