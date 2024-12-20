import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Template from './template';

interface CommentAttributes {
  id: string;
  template_id: string;
  user_id: number;
  text: string;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: string;
  public template_id!: string;
  public user_id!: number;
  public text!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Comment.belongsTo(Template, { foreignKey: 'template_id', as: 'template' });
    Comment.belongsTo(User, { foreignKey: 'user_id' });
  }
}

Comment.init(
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
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  }
);

export default Comment;