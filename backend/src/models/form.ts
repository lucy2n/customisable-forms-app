import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Template from './template';


interface FormAttributes {
  id: number;
  template_id: number;
  user_id: number;
}


interface FormCreationAttributes extends Optional<FormAttributes, 'id'> {}

class Form extends Model<FormAttributes, FormCreationAttributes> implements FormAttributes {
  public id!: number;
  public template_id!: number;
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Form.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    template_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Template,
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
  },
  {
    sequelize,
    tableName: 'forms',
  }
);

Form.belongsTo(Template, { foreignKey: 'template_id' });
Form.belongsTo(User, { foreignKey: 'user_id' });

Template.hasMany(Form, { foreignKey: 'template_id' });
User.hasMany(Form, { foreignKey: 'user_id' });

export default Form;