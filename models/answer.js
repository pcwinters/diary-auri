"use strict";
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    "Answer",
    {
      submissionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Submission", // name of Target model
          key: "id" // key in Target model that we're referencing
        }
      },
      question: DataTypes.INTEGER,
      answer: DataTypes.INTEGER
    },
    {}
  );
  Answer.associate = function(models) {};
  return Answer;
};
