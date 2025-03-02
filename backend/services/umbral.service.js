const  UmbralModel  = require('../models.sql_bck/umbral.model');

class UmbralService {

    static async createUmbral(data){
        const {id_sensor, valor_min, valor_max } = data;
        if (!id_sensor) throw new Error('El campo id_sensor es obligtorio');

        const insertId = await UmbralModel.create(id_sensor, valor_min, valor_max );
        return {
                mensaje: 'Umbral creado con exito',
                id_umbral: insertId 
            };
    }

    static async findAllUmbrales(){
        return await UmbralModel.findAll();
    }

    static async findUmbralById(id_umbral){
        const umbral = await UmbralModel.findById(id_umbral);
        if (!umbral) throw new Error('Umbral no encontrado');
        return umbral;
    }

    static async updateUmbral(id_umbral, nuevoUmbral){
        const { id_sensor, valor_min, valor_max } = nuevoUmbral;
        const update = await UmbralModel.update(id_umbral, id_sensor, valor_min, valor_max );
        if (!update) throw new Error('No se pudo actualizar el umbral');
        return { mensaje: 'Umbral actualizado exitosamente' };
    }

    static async deleteUmbral(id_umbral){
        const deleted = await UmbralModel.delete(id_umbral);
        if (!deleted) throw new Error('No se pudo eliminar el umbral');
        return { mensaje: 'Umbral eliminado exitosamente' };
    }
}

module.exports = UmbralService;