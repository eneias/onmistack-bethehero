
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments();
        table.string('name').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('whatsapp').notNullable();
        table.string('cidade').notNullable();
        table.string('uf',2).notNullable();
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
