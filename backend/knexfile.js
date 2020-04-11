// Update with your config settings.

const connection = {
  host : '127.0.0.1',
  user : 'root',
  password : '',
  database : 'test'
}

module.exports = {

  development: {
    client: 'mysql',
    connection,
    migrations:{
      directory:'./src/database/migrations'
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'mysql',
    connection,

    migrations:{
      directory:'./src/database/migrations'
    },
    useNullAsDefault: true,
  },



  staging: {
    client: 'mysql',
    connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
