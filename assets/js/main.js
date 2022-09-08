/* DataBase */
const productos = [
  {
    id: 1,
    nombre: 'México',
    precio: 34,
    unidades: 5,
  /*  imagen: 'assets/img/brasil-2.png',*/
    imagen: 'assets/img/mexico.png',
  },
  {
    id: 2,
    nombre: 'Argentina',
    precio: 15,
    unidades: 3,
    imagen: 'assets/img/argentina.png',
  },
  {
    id: 3,
    nombre: 'Brasil',
    precio: 20,
    unidades: 7,
    imagen: 'assets/img/brasil.png',
  },
  {
    id: 4,
    nombre: 'Ecuador',
    precio: 20,
    unidades: 7,
    imagen: 'assets/img/ecuador.png',
  }
]

/* Productos */
const productList = document.querySelector('.product-list');


function pintarProductos() {
  let html = ''

  for (const {id, nombre, precio, unidades, imagen } of productos) {
    html += `        <div>
    <article class="products__item">
    <img class="products__image" src="${imagen}" alt="">
    
    <div class="products__data">
    <div class="products__info">
    <h2 class="products__title">${nombre}</h2>
    <h2 class="products__title">Precio: USD $${precio} </h2>
    <span class="products__stock">Cant: ${unidades}</span>
    </div>
    
    <div class="products__button">
    <button type="button" class="button agregar" data-id="${id}"><i class='bx bx-add-to-queue' ></i></button>
    </div>
    </div>
    </article>
    </div>`
    
  }
  return productList.innerHTML = html
}
pintarProductos()

/* Carrito */
const cantidad = document.getElementById('cart-count')
const totalCompra = document.getElementById('cart-total')
const btnEliminar = document.getElementById('cart-delete')
const buttons = document.querySelectorAll('.button')
const comprarElement = document.querySelector('.btn--checkout')

let carrito = []

const cartList = document.querySelector('.cart__list');

function pintarCarrito() {
  let html = ''

  if (carrito.length > 0) {

    for (const {id, cantidad} of carrito) {
      const {nombre,imagen } = productos.find(producto => producto.id === id)
      html += `<li class="cart__item">
      <article class="cart__article grid">
      <img class="cart__image" src="${imagen}">
      
        <div class="cart__data">
          <h2 class="cart__name">${nombre}</h2>

          <div class="cart__minmax">
          <button type="button" class="cart__button btn--remove" id="cart-remove" data-id="${id}">-</i></button>
          <span id="cart-qty">${cantidad}</span>
            <button type="button" class="cart__button btn--add" id="cart-add" data-id="${id}">+</button>
            </div>

            </div>
            <div class="cart__delete">
            <button type="button" class="cart__button btn--delete" id="cart-delete" data-id="${id}"><i class='bx bx-trash' ></i></button>
            </div>
            </article>
            </li>`
    }
  }
  else {

    html = `<h2 class="products__title">Su carrito esta vacio</h2>`

  }
  cartList.innerHTML = html
  totalCompra.innerHTML = total()
  cantidad.innerHTML = contarArticulos()

}
pintarCarrito()




productList.addEventListener('click', function (e) {
  if(e.target.closest(".agregar")){
    console.log(+e.target.dataset.id)
    agregarAlCarrito(+e.target.closest(".agregar").dataset.id)
  }
  })



cartList.addEventListener ("click", function(e){
    const eliminar = e.target
    if(eliminar.closest(".btn--remove")){
      removerDelCarrito(+eliminar.dataset.id)
    }
    if(eliminar.closest(".btn--add")){
      console.log(+eliminar.dataset.id)
      agregarAlCarrito(+eliminar.closest(".btn--add").dataset.id)
    }

    if(eliminar.closest(".btn--delete")){
      eliminarDelCarrito(+eliminar.closest(".btn--delete").dataset.id)
    }
  })

  comprarElement.addEventListener ("click", function(){
    comprar()
  })
  



function agregarAlCarrito(id) {
  const cantidad = 1
  // si el producto (x) en su propiedad id es igual al id que pasamos como párametro, retornalo.
  const productoEncontrado = productos.find(producto => producto.id === id)

  if (productoEncontrado && productoEncontrado.unidades > 0) {
    // si el articulo (x) en su propiedad id es igual al id que pasamos como párametro, retornalo.
    const articuloEncontrado = carrito.find(articulo => articulo.id === id)

    if (articuloEncontrado) {
      // console.log('aumenta su cantidad')

      // verificar las unidades dispobibles
      if (checarUnidades(id, cantidad + articuloEncontrado.cantidad)) {
        articuloEncontrado.cantidad += cantidad
      } else {
        window.alert('supera las unidades disponibles')
      }
    } else {
      carrito.push({ id, cantidad })
    }
  } else {
    window.alert('Lo sentimos no contamos con unidades disponibles')
  }
  pintarCarrito()
}



function checarUnidades(id, cantidad) {
  const productoEncontrado = productos.find(producto => producto.id === id)
  return productoEncontrado.unidades - cantidad >= 0
}

function removerDelCarrito(id) {
  const cantidad = 1

  // si el articulo (x) en su propiedad id es igual al id que pasamos como párametro, retornalo.
  const articuloEncontrado = carrito.find(articulo => articulo.id === id)

  console.log('cantidad: ', articuloEncontrado.cantidad)
  if (articuloEncontrado.cantidad - cantidad > 0) {
    articuloEncontrado.cantidad -= cantidad
  } else {
    carrito = carrito.filter(articulo => articulo.id !== id)
  }
  pintarCarrito()
}
function eliminarDelCarrito(id) { 
    carrito = carrito.filter(articulo => articulo.id !== id)
    pintarCarrito()
}

function contarArticulos() {
  let suma = 0
  for (const articulo of carrito) {
    suma += articulo.cantidad
  }
  return suma
}

function total() {
  let suma = 0

  for (let articulo of carrito) {
    const productoEncontrado = productos.find(producto => producto.id === articulo.id)

    console.log(articulo.cantidad, productoEncontrado.nombre, productoEncontrado.precio)

    suma += articulo.cantidad * productoEncontrado.precio
  }

  return suma
}

function comprar() {
  for (let articulo of carrito) {
    const productoEncontrado = productos.find(producto => producto.id === articulo.id)
    productoEncontrado.unidades -= articulo.cantidad
  }
  window.alert('gracias por su compra')
  carrito = []
  pintarProductos()
  pintarCarrito()

}