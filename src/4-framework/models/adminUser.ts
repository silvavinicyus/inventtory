import { IAdminUserEntity } from '@domain/entities/adminUser'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/database'

export class AdminUserModel extends Model<IAdminUserEntity> {}

AdminUserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'admin_users',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)
