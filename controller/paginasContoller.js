// importamos nuestro modelo de la db
import { viaje } from "../model/Viajes.js";
import { Testimonial } from "../model/Testimoniales.js";
/*
        req(request): es lo que le enviamos al servidor. ej:datos de un formulario
        res(respond): es la respuesta que el servidor nos envia
    */
const paginaInicio = async (req, res) => {
  // el metodo send sirve para mostar algo en pantalla.
  // res.send('inicio')

  // el metodo render sirve para renderizar o mostrar una vista
  // en nuestroa rauter podemos tambien crear un objeto de configuracion para poder crear variables que sean
  // accesible a nuestras paginas. ej: esta propidad de pagina la defini para accerla accesible a mi pagina de nosotros
  // y usar esa varibale en dicha pagina

  // ambas consultas la colocamos en un arrelgo. Esto lo hacemos porque si tenemos las consultas independients
  // entonces una tendra que esperar el timepo de finalizacio de la otra para que la misma se ejecute
  // por lo tanto esto tarda y no seria bueno para el perfomance. Entocnces la solucion a este problema es
  // colocar ambas consultas en un arreglo y con promise.all() ejecutamos ambas a la vez.
    const promises = [];

    promises.push(viaje.findAll({
      // aqui limitamos solo a 3 viajes para que solo se muestres esos tres
        limit: 3
    }));

    promises.push(Testimonial.findAll({
      // solo mostramos 3 testimoniales
        limit: 3
    }));

    try {
        // pasar al promise
        const resultado =  await Promise.all(promises);
        res.render('inicio', {
            viajes : resultado[0],
            testimoniales: resultado[1],
            clase : 'home',
            pagina: 'Inicio',
        })
    } catch (error) {
        console.log(error);
    }
}
const paginaNosotros = (req, res) => {
  res.render("nosotros", {
    pagina: "Nosotros",
  });
};

const paginaViajes = async (req, res) => {
  // consultar a la DB
  // ese findAll sirve como un SELECT *, es decir traeme todos los registros de la DB
  const viajes = await viaje.findAll();
  res.render("viajes", {
    pagina: "Proximos Viajes",
    viajes
  });
};

/*
    Aqui sucede lo importante:
    1. const { slug } = req.params: obtiene el slug que viene en la direccion del navegador.
    2. viaje.findOne(): busca un viaje en la base de datos.
    3. where: { slug }: le indica que busque el viaje cuyo slug coincida con el que recibio.
    4. resultado: guarda toda la informacion del viaje encontrado.
    Por ejemplo, si recibimos viaje-italia, Sequelize busca el registro de Italia y nos devuelve sus datos.

*/
const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params;
  // hacemos la consulta a la base de datos para traernos el unico registro que coincida con nuestro slug
  // findOne es un metodo de sequelize que sirve para buscar un unico registro que cumpla con determinadas condiciones
  try {
    const resultadoViaje= await viaje.findOne({where:{slug}});
      res.render("viaje",{
        pagina: 'Informacion del Viaje',
        resultadoViaje
      });
    } 
  catch (error) {
    console.log(error);
  }
};

const paginaTestimoniales = async (req, res) => {
  const testimoniales = await Testimonial.findAll();
  res.render("testimoniales", {
    pagina: "Testimoniales",
    testimoniales
  });
};

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje,
};
