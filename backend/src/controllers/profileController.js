const connection = require('../database/connection');

module.exports = {
    async index(require, response){
        const ong_id = request.headers.authorization;

        const casos = await connection('casos')
        .where('ong_id', ong_id)
        .select('*');

    return response.json(casos);



    }
}