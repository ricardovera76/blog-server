module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("posts", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    sender_name: {
      type: DataTypes.STRING,
      references: {
        model: "users",
        key: "user_name",
      },
    },
    text: {
      type: DataTypes.TEXT,
    },
  });

  return Posts;
};
