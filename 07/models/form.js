module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define(
    "Form",
    {
      title: DataTypes.STRING,
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "forms",
    }
  );

  const Question = sequelize.define(
    "Question",
    {
      content: DataTypes.STRING,
    },
    {
      tableName: "questions",
    }
  );

  const Option = sequelize.define(
    "Option",
    {
      content: DataTypes.STRING,
    },
    { tableName: "options" }
  );

  const Response = sequelize.define(
    "Response",
    {
      description: DataTypes.STRING,
    },
    { tableName: "responses" }
  );
  const Answer = sequelize.define(
    "Answer",
    {
      description: DataTypes.STRING,
    },
    { tableName: "answers" }
  );
};
