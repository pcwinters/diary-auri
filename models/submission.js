"use strict";
module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define(
    "Submission",
    {
      forDaySinceEpoch: DataTypes.INTEGER,
      email: DataTypes.STRING
    },
    {}
  );
  Submission.associate = function(models) {
    Submission.hasMany(models.Answer, {
      as: "answers",
      foreignKey: "submissionId"
    });
  };
  return Submission;
};
