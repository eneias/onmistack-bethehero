const connection = require('../database/connection');

module.exports = {

    async index(request,response){
        const users = await connection('users').select('*');
        return response.json(users);
    },
    async create(request,response, next){

        const {name, username, password, whatsapp, cidade, uf} = request.body;
        const ong_id = request.headers.authorization;
        const created_at = new Date();

        try {
            const [id] = await connection('users').insert({
                name,
                username,
                password,
                whatsapp,
                cidade,
                uf,
                created_at
            });
            return response.json({id});
        }
        catch (e) {
            let error = {
                error: true,
                message: e.sqlMessage
            }
            if( e.code === "ER_DUP_ENTRY" ) {
                error.message = "Usuário já existe";
            }
            return response.json(error);
        }
    },
    async login(request,response, next){

        const { username, password } = request.body;

        const user = await connection('users')
            .where('username', username)
            .andWhere('password', password)
            .select("*")
            .first();

        if(!user){
            return response.status(400).json({error: "Usuario ou senha inválidos!"});
        }

        return response.json(user);
    }
}