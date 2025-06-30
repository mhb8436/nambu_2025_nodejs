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

  Form.associate = function (models) {
    Form.hasMany(models.Question, {
      foreignKey: "formId",
      as: "question",
    });
    Form.hasMany(models.Response, {
      foreignKey: "formId",
      as: "response",
    });
  };

  Question.associate = function (models) {
    Question.belongsTo(models.Form, {
      foreignKey: "formId",
      as: "form",
    });
    Question.hasMany(models.Option, {
      foreignKey: "questionId",
      as: "option",
    });
    Question.hasMany(models.Answer, {
      foreignKey: "questionId",
      as: "answer",
    });
  };

  Option.associate = function (models) {
    Option.belongsTo(Question, {
      foreignKey: "questionId",
      as: "question",
    });
    Option.belongsTo(Answer, {
      foreignKey: "optionId",
      as: "answer",
    });
  };
  return {
    Form,
    Question,
    Option,
    Response,
    Answer,
  };
};
