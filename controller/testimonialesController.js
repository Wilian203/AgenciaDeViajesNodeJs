import {Testimonial} from  '../model/Testimoniales.js'
const guardarTestimonial = async (req, res)=>{
    const{nombre, correo, mensaje} = req.body
    
    // realizar la validacion del formulario
    const errores = []

    if(nombre.trim() === ''){
        errores.push({'mensaje': 'Debes ingresar un nombre'})
    }

    if(correo.trim() === ''){
        errores.push({'mensaje': 'Debes ingresar un correo'})
    }

    if(mensaje.trim() === ''){
        errores.push({'mensaje': 'Debes ingresar un mensaje'})
    }

    // le pasamos los errores en caso de que hayan a la vista de testimoniales para que se muestren ahora con los errores
    if(errores.length > 0){
        // nos traemos los testimoniales y lo pasamos a la vista
        const testimoniales = Testimonial.findAll();
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            errores,
            testimoniales
        })
    }else{
        // agregamos los testimoniales a la DB
        try {
            // create sirve como un insert into. inserta los valores a la DB
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })

            // redireccionamos al usuarii
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }
  
}

export{
    guardarTestimonial
}