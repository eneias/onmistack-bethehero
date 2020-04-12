const connection = require('../database/connection');

module.exports = {

    async index(request,response){
        const users = await connection('users').select('*');
        return response.json(users);
    },
    async create(request,response, next){

        const {name, username, password, whatsapp, cidade, uf} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('users').insert({
            name,
            username,
            password,
            whatsapp,
            cidade,
            uf
        });
        return response.json({id});
    },
    async login(request,response, next){

        const {username, password} = request.body;

        const [pass] = await connection('users')
                                    .select('*')
                                    .where("username", '=', username);
        if(pass == password) {

        }
        const ong_id = request.headers.authorization;
        return response.json({id});
    }
}