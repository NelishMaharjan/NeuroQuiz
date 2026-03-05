module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      xp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      role: {
        type: DataTypes.ENUM("user", "admin", "developer"),
        allowNull: false,
        defaultValue: "user",
      },
      isOnline: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      lastActive: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  return User;
};