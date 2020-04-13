
var md5 = require('md5');

exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTableIfNotExists("users", function (table) {
            table.increments();
            table.string('name').notNullable();
            table.string('username').notNullable().unique();
            table.string('password').notNullable();
            table.string('whatsapp').notNullable();
            table.string('cidade').notNullable();
            table.string('uf',2).notNullable();
            table.string('token').notNullable();
            table.integer('rule').notNullable();
            table.timestamps();
        }).then(function () {
                return knex("users").insert([
                    {
                        name: "admin",
                        username: "admin",
                        password: "admin",
                        whatsapp: "*",
                        cidade: "*",
                        uf: "*",
                        rule: 0,
                        token: md5("se picapau tivesse comunicado a policia isso nunca teria acontecido")
                    }
                ]);
            }
        ),
    ]);
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
