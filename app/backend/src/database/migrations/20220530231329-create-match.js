'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamName: {
        type: Sequelize.STRING
      },
      id: {
        type: Sequelize.INTEGER
      },
      homeTeam: {
        type: Sequelize.INTEGER
      },
      awayTeam: {
        type: Sequelize.INTEGER
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER
      },
      inProgress: {
        type: Sequelize.BOOLEAN
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matches');
  }
};
