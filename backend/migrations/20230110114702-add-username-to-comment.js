'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Comments',  'username', Sequelize.STRING );
   
    /**
     *
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.addColum('Comments', { username: Sequelize.STRING });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comments', 'username');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.removeColumn('Comments', 'username');
     */
  }
};
