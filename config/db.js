import Sequelize  from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

/*
    primer parametro: nombre de la db
    segundo parametro: usuario de msyql
    tercer parametro: clave
    cuarto parametro: objeto de configuracion

    host: significa donde esta corriendo el servidor en este caso es en mi pc, por eso coloque localhost
    port:
    dialect: esto es indicarle a sequelize que vamos a trabajar utilizando mysql para que aplique las reglas y
    careacteristicas de mysql. Si fuese otra como: PostgresSQL, SQlite o MariaDB pues en el dialect se lo indicamos

    define: la configuracion que aplicamos con el objto define y su propiedes respectiva dejarle en false es que 
    sequelize por defecto crea dos columnas; una que toma la fecha en que se crea un registro y la otra en la que se 
    actualizo. Entonces lo que le indicamos a sequelize al tener esa propieda como false es que no cree esas dos columnas
*/
const db = new Sequelize(process.env.DB_URL,{
    define:{
        timestamps:false
    },

    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

export default db;