import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Form from './form';

interface CommentAttributes {
  id: number;
  form_id: number;
  user_id: number;
  text: string;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number;
  public form_id!: number;
  public user_id!: number;
  public text!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    form_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Form,
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
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'comments',
  }
);

Comment.belongsTo(Form, { foreignKey: 'form_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Form.hasMany(Comment, { foreignKey: 'form_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });

export default Comment;