module.exports = (sequelize, DataTypes) => {
  const UserChats = sequelize.define(
    "user_chats",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      chat_name: {
        type: DataTypes.STRING,
        references: {
          model: "chats",
          key: "name",
        },
      },
      user_name: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "user_name",
        },
      },
    },
    { timestamps: false }
  );

  return UserChats;
};
