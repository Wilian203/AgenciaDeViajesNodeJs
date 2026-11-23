import express from "express"; 
// importamos nuestras paginas del controlador
import {
     paginaInicio, 
     paginaNosotros, 
     paginaViajes, paginaTestimoniales,
     paginaDetalleViaje
    } 
    from '../controller/paginasContoller.js';
import {guardarTestimonial} from '../controller/testimonialesController.js'
// definimos el metodo rauter de express que nos ayudara a definir nuestros endpoints o rutas
const router = express.Router()

router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros );
router.get('/viajes', paginaViajes);
/*
 :slug se le llama comodin. El slug es como un identificador unico que nos permite identificar cada viaje
 Por ejemplo, en nuestra base de datos podriamos tener:
    Viaje	Slug
    Italia	viaje-italia
    Francia	viaje-francia
    Japon	viaje-japon
    Cuando hacemos clic en Mas informacion de Italia, el navegador nos lleva a esta direccion:
    www.misitio.com/viajes/viaje-italia

    Esto le dice a Express:

    Cuando alguien visite una direccion que comience con /viajes/, ejecuta la funcion paginaDetalleViaje y 
    captura lo que venga despues.

    Por ejemplo:
    /viajes/viaje-italia
    Express captura viaje-italia y lo guarda en req.params.slug.
*/ 
router.get('/viajes/:slug', paginaDetalleViaje)
router.get('/testimoniales', paginaTestimoniales);


// recibir datos del formulario
router.post('/testimoniales', guardarTestimonial)

export default router;