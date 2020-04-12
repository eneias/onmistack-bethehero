const connection = require('../database/connection');

module.exports = {
    async create(request,response){
        const { username, password } = request.body;

        const user = await connection('users')
        .where('username', username)
        .andWhere('password', password)
        .select(['name', 'username', 'id'])
        .first();


        if(!user){
            return response.status(400).json({error: "Usuario ou senha inválidos!"});
        }

        return response.json(user);

        
    }

}