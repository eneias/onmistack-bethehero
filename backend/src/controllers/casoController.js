const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        const {page = 1} = request.query;

        const [count] = await connection('casos')
        .count();


        const incidents = await connection('casos')
        .join('ongs', 'ongs.id', '=', 'casos.ong_id')
        .limit(5)
        .offset((page - 1 ) *5 )
        .select(['casos.*',
         'ongs.name',
          'ongs.email',
           'ongs.whatsapp',
           'ongs.cidade', 
           'ongs.uf']);

        
        response.header('X-Total-Count',count['count(*)']);

        return response.json(incidents);


    },
    async create(request, response){
    const {titulo, descricao,value} = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('casos').insert({
        titulo,
        ong_id,
        descricao,
        value
    });
    return response.json({id});
    },

    async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const caso = await connection('casos')
            .where('id',id)
            .select('ong_id')
            .first();

            if(caso.ong_id != ong_id){
                return response.status(401).json({error:'Operarion not permitted.'})
            }
        await connection('casos').where('id',id).delete();

        return response.status(204).send();
    }
};