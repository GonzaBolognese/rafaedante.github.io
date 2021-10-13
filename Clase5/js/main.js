let datos = [
    {titulo: 'Carne', cantidad: 12, precio: 2500},
    {titulo: 'Jabon', cantidad: 15, precio: 3000}
]

let datosPrevios = []

const rest = RESTClient('https://5cfdb2b8ca949b00148d38ba.mockapi.io/items')

const btnAgregar = document.querySelector('#btnAgregar')
const inpBusqueda = document.querySelector('#inpBusqueda')
const btnDeshacer = document.querySelector('#btnDeshacer')
const inpAgregar = document.querySelector('#inpAgregar')
const galeria = document.querySelector('#galeria')
const lnkLimpiarLista = document.querySelector('#lnkLimpiarLista')

const template = ({titulo, cantidad, precio}) => `<div 
class="item">
<div class="titulo">
  ${titulo}
</div>
<div class="controles">
    <span>${cantidad}</span>
    <span>${precio}</span>
</div>
<div class="borrar">
  <a href="#" class="borrar">Eliminar</a>
</div>
</div>`


//Funciones
function render(lista = [{titulo: '', cantidad: 0, precio: 0}]) {
    galeria.innerHTML=''
    lista.forEach(item => {
        galeria.innerHTML += template(item)
    })
}

/* async function loadAPI(completado) {
    const endpoint = 'https://5cfdb2b8ca949b00148d38ba.mockapi.io/items'

    const res = await fetch(endpoint)
    const json = await res.json()

    datos = json

    completado(datos)

} */

//Eventos
// al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
    /* loadAPI(function() {
        render(datos)
    }) */
    rest.get(function(json) {
        datos = json
        render(datos)
    })
})

//Al hacer click en el boton Agregar item
btnAgregar.addEventListener('click', () => {
    datosPrevios = datos.slice(0)    
    datos.push({
        titulo: inpAgregar.value,
        cantidad: 1,
        precio: 10
    })

    rest.post(JSON.stringify({
        titulo: inpAgregar.value,
        cantidad: 1,
        precio: 10
    }), function(p) {
        console.log(p)
    })

    render(datos)
    inpAgregar.value = ''
})

//Al hacer click en el boton Deshacer
btnDeshacer.addEventListener('click', () => {
    datos = datosPrevios
    render(datos)
})

//Al ingresar datos en el campo de busqueda
inpBusqueda.addEventListener('input', e => {    
    /* let vista = datos.filter((val) => {
        if(val.titulo.includes(e.target.value)) {
            return true
        } else {
            return false
        }
    }) */
    let vista = datos.filter(val => val.titulo.includes(e.target.value))
    render(vista)
})

//Al hacer click en limpiar lista
lnkLimpiarLista.addEventListener("click", () => {
    datosPrevios = datos.slice(0)
    datos = []
    render(datos)
})

//Al hacer click en guardar lista
//Al hacer click en cargarlista
//Al hacer click en un item con la clase borrar

//Objetos

//const rest = (function() {

    /*  ---------------FORMA 1--------------
        async function loadAPI(completado) {
        const endpoint = 'https://5cfdb2b8ca949b00148d38ba.mockapi.io/items'
    
        const res = await fetch(endpoint)
        const json = await res.json()   
        completado(json)
    
    }

    return {
        getAll: loadAPI
    } ---------------FIN FORMA 1--------------*/
/* 
    const endpoint = 'https://5cfdb2b8ca949b00148d38ba.mockapi.io/items'
    function crearPeticion(url, metodo='GET', cuerpo='') {
        return async function(completado) {
            let rest
            if(metodo == 'GET') {
                res = await fetch(url)
            } else {
                res = await fetch(url, {method: metodo, body:cuerpo})
            }

            let data = await res.json()
            completado(data)
        }
    }
    
    return {
        get: crearPeticion(endpoint),
        post: (cuerpo, callback) => crearPeticion(endpoint, 'POST', cuerpo)(callback),
        put: (id, cuerpo, callback) => crearPeticion(endpoint+'/'+id, 'PUT', cuerpo)(callback),
        delete: (id, callback) => crearPeticion(endpoint+'/'+id, 'DELETE')(callback)
    }

})() */
