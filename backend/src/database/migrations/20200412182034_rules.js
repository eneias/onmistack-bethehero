
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTableIfNotExists("rules", function (table) {
            table.integer("id");
            table.string('name');
            table.string('description');
        }).then(function () {
                return knex("rules").insert([
                    {id: 0, name: "admin", description: "Administrador do sistema"},
                    {id: 20, name: "personal", description: "Treinador"},
                    {id: 10, name: "user", description: "Usuario comum"}
                ]);
            }
        ),
    ]);
};

exports.down = function(knex) {
  
};
