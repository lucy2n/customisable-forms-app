import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public is_admin!: boolean;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    const Template = require('./template').default;
    const Form = require('./form').default;
    const Like = require('./like').default;

    User.hasMany(Template, { foreignKey: 'user_id', as: 'templates' });
    User.hasMany(Form, { foreignKey: 'user_id', as: 'forms' });
    User.hasMany(Like, { foreignKey: 'user_id', as: 'likes' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
