'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'imoveis',
      'endereco',
      {
        type: Sequelize.STRING,
        allowNull: false
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'imoveis',
      'endereco',
    );
  }
};
