"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Answers", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        submissionId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Submissions", // name of Target model
            key: "id" // key in Target model that we're referencing
          }
        },
        question: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        answer: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() =>
        queryInterface.addConstraint(
          "Answers",
          ["submissionId", "question", "answer"],
          {
            type: "unique",
            name: "unique_submission_question_answer"
          }
        )
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Answers");
  }
};
