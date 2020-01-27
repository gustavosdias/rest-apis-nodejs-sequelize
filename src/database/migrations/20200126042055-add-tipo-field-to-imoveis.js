'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'imoveis',
      'tipo',
      {
        type: Sequelize.STRING(4),
        allowNull: false
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'imoveis',
      'tipo',
    );
  }
};
