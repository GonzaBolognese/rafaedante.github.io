//Proceso en segundo plano
//fetch: se ejecuta al interceptar una peticion saliente
//operador self: es una referencia al objeto -> SW
self.addEventListener('fetch', async function(e) {
    //console.log(e.request.url)
    const r = await fetch(e.request)
    console.log(r)
})

//Preparacion
//install: se ejecuta una vez al principio
self.addEventListener('install', e => {
    // COPIADO DE ARCHIVOS A LA CACHE
})

//activate: se ejecuta al haber un cambio en este archivo
self.addEventListener('activate', e => {
    // ACTUALIZACION DE LOS ARCHIVOS DE LA CACHE
})