'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'imoveis',
      'titulo',
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
      'imoveis',
      'titulo',
      {
        type: Sequelize.STRING,
        allowNull: false
      },
    );
  }
};
