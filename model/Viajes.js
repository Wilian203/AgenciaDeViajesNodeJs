import Sequelize  from 'sequelize';
import db from "../config/db.js";

/*
    Modelo en Sequelize
    Un modelo es una representacion de una tabla de la base de datos. Define los campos que tendra, sus tipos 
    de datos y permite realizar operaciones como consultar, crear, actualizar y eliminar registros.

    Metodo define()
    Es el metodo que utilizamos para crear un modelo, indicando el nombre y la estructura de sus campos.
*/

export const viaje = db.define('viajes', {
    titulo:{
        type:Sequelize.STRING
    },

    precio:{
        type:Sequelize.STRING
    },

    fecha_ida:{
        type:Sequelize.DATE
    },

    fecha_vuelta:{
        type:Sequelize.DATE
    },

    imagen:{
        type:Sequelize.STRING
    },

    descripcion:{
        type:Sequelize.STRING
    },

    disponibles:{
        type:Sequelize.STRING
    },

    slug:{
        type:Sequelize.STRING
    },

})

