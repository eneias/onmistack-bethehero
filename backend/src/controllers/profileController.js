const connection = require('../database/connection');
const base64 = require('../utils/base64');

module.exports = {
    async index(request, response){

        //Basic Authorization -- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
        let auth = request.headers.authorization;
        auth = auth.replace("Basic ", "");

        if( auth ) {
            let id_tk = base64.fromBase64(auth);
            id_tk = id_tk.split(":");
            if (id_tk.length == 2) {
                let id = id_tk[0];
                let token = id_tk[1];
                const [me] = await connection('users')
                    .where('id', id)
                    .select('*');

                if( !me ) {
                    return response.send(422); //422 (Unprocessable Entity)
                }

                if (me.token === token || me.rule === 0) {
                    return response.json(me);
                }
            }
        }

        //const casos = await connection('casos')
        //.where('ong_id', 1)
        //.select('*');

        return response.send(401); //401 (Unauthorized)

    }
}