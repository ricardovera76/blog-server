module.exports = (sequelize, DataTypes) => {
  const Chats = sequelize.define(
    "chats",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
    },
    { timestamps: false }
  );

  return Chats;
};
