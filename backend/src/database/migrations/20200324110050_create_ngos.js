
exports.up = function (knex) {
  return knex.schema.createTable('ngos', (table) => {
    table.increments()

    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password', 60).notNullable()
    table.string('whatsapp').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('ngos')
}
