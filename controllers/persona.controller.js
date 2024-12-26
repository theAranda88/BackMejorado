const {FindPersonsById, FindAllPersons, RegisterPerson, Login, FindAllUsuarios, FindAllInstructores} = require('../services/persona.service')
const validarCamposRequeridos = require('../middleware/camposRequeridos');
const controller = {};

controller.Login = async function (req, res) {
    try {
        // Validar los campos requeridos
        validarCamposRequeridos(['email', 'password'])(req, res, async () => {
            const { email, password } = req.body;

            // Llamar al servicio para manejar la lógica del login
            const response = await Login(email, password);

            res.status(200).json(response);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

controller.ListarUsuariosC = async function (req, res) {
    try {
        const usuario = await FindAllUsuarios();
        res.json(usuario); 
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}
controller.ListarPersonasC = async function(req, res) {
    try {
        const personas = await FindAllPersons(); //Llama al servicio para obtener los personas
        res.json(personas); //Si la operación es exitosa, se devuelve un estado 200 con los personas.
    } catch (error) {
        res.status(500).json({ error: error.message  }); //Si hay un error, se devuelve un estado 500 con el mensaje de error.
    }
}
controller.ListarIntructoresC = async function(req, res) {
    try {
        const instructores = await FindAllInstructores(); //Llama al servicio para obtener los instructores
        res.json(instructores); //Si la operación es exitosa, se devuelve un estado 200 con los personas.
    } catch (error) {
        res.status(500).json({ error: error.message  }); //Si hay un error, se devuelve un estado 500 con el mensaje de error.
    }
}

controller.BuscarpersonaPorIdC = async function(req, res) {
    try{
        const id_persona = req.params.id;
        // Llamar al servicio para actualizar el usuario
        const person = await FindPersonsById(id_persona)
        // Enviar la respuesta
        return res.status(201).json(person);
    }catch(error){
        res.status(500).json({error: error.message})

    }
}

controller.CrearPersonaC = async function(req, res) {
    try {
        // Validar los campos del usuario
        validarCamposRequeridos(['nombre','email', 'password', 'n_documento_identidad', 'sede', 'id_rol']) (req, res, async()=>{
        const personaData = req.body; //valida los campos de usuarios

        if (!personaData.nombre || !personaData.email || !personaData.password  || !personaData.n_documento_identidad || !personaData.sede || !personaData.id_rol) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        const user = await NewPerson(personaData);//Si son correctos se crea el usuario
        res.status(201).json(user);//Si la operación es exitosa, se devuelve un estado 201 con el usuario creado.
    })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

controller.RegisterPersonaC = async function (req, res) {
    try {
        console.log('RegisterController');
        // Validar los campos requeridos
        validarCamposRequeridos(['nombre', 'email', 'password', 'n_documento_identidad', 'sede', 'rol'])(req, res, async () => {
            const personaData = req.body;

            // Validación adicional según el rol
            if (personaData.rol === 3) { // Rol "usuario"
                validarCamposRequeridos(['n_ficha', 'jornada', 'nombre_del_programa'])(req, res, async () => {
                    const message = await RegisterPerson(personaData);
                    res.status(201).json({ message });
                });
            } else if (personaData.rol === 2) { // Rol "administrador_instructor"
                validarCamposRequeridos(['n_ficha', 'nombre_del_programa'])(req, res, async () => {
                    const message = await RegisterPerson(personaData);
                    res.status(201).json({ message });
                });
            } else if (personaData.rol !== 1) { // Validar roles no válidos
                return res.status(400).json({ error: 'Rol no válido' });
            } else {
                // Si el rol no necesita datos adicionales
                const message = await RegisterPerson(personaData);
                res.status(201).json({ message });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = controller;