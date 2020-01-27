'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'imoveis',
      'tipoCompra',
      'tipo_compra'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'imoveis',
      'tipo_compra',
      'tipoCompra'
    );
  }
};
