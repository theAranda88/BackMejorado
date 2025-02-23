'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    static associate(models) {
      // Relación con Rol
      this.belongsTo(models.Rol, {
        foreignKey: 'id_rol',
        as: 'rol'
      });

      // Relación 1:1 con Usuario
      this.hasOne(models.Usuario, {
        foreignKey: 'id', // Clave foránea en la tabla Usuario
        as: 'usuario'
      });

      // Relación 1:1 con AdministradorInstructor
      this.hasOne(models.AdministradorInstructor, {
        foreignKey: 'id', // Clave foránea en AdministradorInstructor
        as: 'instructor'
      });

      // Relación N:M con Modulo (a través de ModuloUsuario)
      this.belongsToMany(models.Modulo, {
        through: 'ModuloUsuario',
        foreignKey: 'id_persona', // Clave de Persona en la tabla intermedia
        otherKey: 'id_modulo', // Clave de Modulo en la tabla intermedia (¡debe existir!)
        as: 'modulos'
      });
    }
  }

  Persona.init(
    {
      // Definir campos con detalles completos (mejor práctica)
      nombre: {
        type: DataTypes.STRING,
        allowNull: false // Campo obligatorio
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Email único
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      n_documento_identidad: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Documento único
      },
      sede: {
        type: DataTypes.STRING,
        allowNull: false
      },
      id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Rol', // Nombre del modelo Rol (asegúrate de que exista)
          key: 'id_rol' // Clave primaria en Rol (debe coincidir)
        }
      }
    },
    {
      sequelize,
      modelName: 'Persona',
      tableName: 'Personas', // Opcional: si el nombre de la tabla no es "Personas"
      timestamps: true // Añade createdAt y updatedAt automáticamente
    }
  );

  return Persona;
};