'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('imoveis', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        titulo:{
          type: Sequelize.STRING(30),
          allowNull: false
        },
        tipoCompra:{
          type: Sequelize.STRING(7),
          allowNull: false
        },
        quartos:{
          type: Sequelize.INTEGER,
          allowNull: false
        },
        banheiros:{
          type: Sequelize.INTEGER,
          allowNull: false
        },
        vagas:{
          type: Sequelize.INTEGER,
          allowNull: false
        },
        pet:{
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        mobilia:{
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        metragem:{
          type: Sequelize.INTEGER,
          allowNull: false
        },
        created_at:{
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users');
  }
};
