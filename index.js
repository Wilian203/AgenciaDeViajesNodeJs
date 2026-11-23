import express from "express"; 
import router from './routes/index.js'
import db from './config/db.js'
import dotenv from 'dotenv';
dotenv.config()


// ejecutamos la funcion de express que la misma crea una app y esta app nos retorna un objeto para
// poder utilizar sus metodos y propiedades.
const app = express();


// conectar a la db
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error))
// definimos el puerto donde correa nuesta app
const port = process.env.port || 4000;

/*
    - app.set():Es un metodo que permite establecer o guardar configuraciones 
    dentro de una aplicacion Express. En palabras simples: sirve para decirle a 
    Express como queremos que funcione una determinada parte de nuestra aplicacion.  
    - 'view engine': es el nombre de la configuracion.
    - 'pug': es el valor que le asignamos a esa configuracion.
    "Lo que hacemos en esta linea es decirle a express, quiero que utilices Pug como motor de plantillas de mi aplicacion".
*/
app.set('view engine', 'pug')


// Habilitar express.json
app.use(express.urlencoded({ extended: false }));


// obtener el anio actual
app.use((req, res, next)=>{
    const year = new Date();
    // res.locals nos permitira definir variables que podamos hacer accesibles a todas las vistas 
    // en esta ocacion definimos esta varibale que obtiene el anio actual automaticamente para mostrarlo en el footer
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    
    // next le indica a express que ya terminamos en este middelware y pase al siguiente.Sino llamanos este next la web 
    // se caera
    next();
})

// agregamos el rauter
// el metodo use soporta todos los verbos HTTP: GET- POST- PUTCH - DELETE
// Lo que hacemos aqui es que a partir de la pagina principal cargemos todas los endpoints o rutas
app.use('/', router)

// definimos la carpeta publica para que express la reconozca
/*
     le estamos diciendo a Express que permita acceder publicamente a
     los archivos que se encuentran dentro de la carpeta public, como imagenes, CSS, JavaScript, iconos, etc.
*/
app.use(express.static('public'))

// utilizamos el metodo listen para escuhar en que puerto se esta ejecutando el servidor
app.listen(port, ()=>{
    console.log(`El servidor se esta ejecutando en el puerto ${port}`)
})