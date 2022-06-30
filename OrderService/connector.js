const Knex = require('knex')

const knex = Knex({
    client: 'mysql2',
    connection: 'mysql://admin1:Admin@123@localhost:3306/soa_final'
})

module.exports = knex
