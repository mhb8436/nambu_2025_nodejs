module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      content: DataTypes.TEXT,
      tag: DataTypes.STRING,
    },
    {
      tableName: "notes",
    }
  );
  return Note;
}; 