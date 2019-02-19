"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Submissions", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        forDaySinceEpoch: {
          type: Sequelize.INTEGER
        },
        email: {
          type: Sequelize.STRING
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
        queryInterface.addConstraint("Submissions", ["forDaySinceEpoch"], {
          type: "unique",
          name: "unique_forDaySinceEpoch"
        })
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Submissions");
  }
};
