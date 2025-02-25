const jwt = require('jsonwebtoken');
const CrearToken =  async function (user){
    const {id_persona, n_documento_identidad} = user;
    const payload = {id_persona, n_documento_identidad};
    console.log(payload);
    const secret = process.env.JWT_SECRET;
    const options = {expiresIn: '5h'};
    const token = jwt.sign(payload, secret, options);//toma tres parámetros: el payload (información sobre el usuario), la clave secreta utilizada para firmar el token y las opciones de configuración del token.
    return token
    ;
};

module.exports = CrearToken;