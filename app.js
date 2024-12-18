let currentUser;
let carrito = [];
set_storage()
const buttonLogin = document.querySelector("#btn_login");
const buttonSignUp = document.getElementById("btn_signup")

buttonLogin.addEventListener("click", login);
buttonSignUp.addEventListener("click",  signUp);

function set_storage () {
    if(localStorage.account === undefined) {
        localStorage.setItem("account", "{}");
    } 
    if(localStorage.cart === undefined) {
        localStorage.setItem("cart", "{}")
    }
    if(localStorage.history === undefined) {
        localStorage.setItem("history", "{}")
    }
}

 function login () {
    const email_tag = document.querySelector("#input_email");
    const password_tag = document.querySelector("#input_password");

    const email = email_tag.value;
    const password = password_tag.value;

    const storage_account = localStorage.account;
    const storage_account_js = JSON.parse(storage_account);

    if(Object.keys(storage_account_js).find((key) => key === email)) {
        if (password === storage_account_js[email]) {
            currentUser = email;
            let tarjetaBienvenida = document.createElement("div");
            let header = document.getElementById("header")
            Swal.fire({
                title: "Bienvenido!",
                icon: "success"});
            tarjetaBienvenida.className = "tarjeta_bienvenida";
            tarjetaBienvenida.innerHTML = `
                 <p>Bienvenido</p>
            `
            let main = document.querySelector(".main");
            main.style.display = "block";
            header.style.display = "none";
            header.append(tarjetaBienvenida)
        } else {
            let tarjetaBienvenida = document.createElement("div");
            let header = document.getElementById("header")
            Swal.fire({
                title: "Contrasena incorrecta",
                icon: "error"});
            tarjetaBienvenida.className = "tarjeta_bienvenida";
            tarjetaBienvenida.innerHTML = `
                 <p>Contrasena incorrecta</p>
            `
            header.append(tarjetaBienvenida)
        }
    } else {
        let tarjetaBienvenida = document.createElement("div");
        let header = document.getElementById("header")
        Swal.fire({
            title: "Cuenta inexistente, crea una cuenta nueva",
            icon: "info"});
        tarjetaBienvenida.className = "tarjeta_bienvenida";
        tarjetaBienvenida.innerHTML = `
             <p>Cuenta inexistente, crea una cuenta nueva</p>
        `
        header.append(tarjetaBienvenida)
    }

 }

 function signUp () {
    const email_tag = document.querySelector("#input_email");
    const password_tag = document.querySelector("#input_password");

    const email = email_tag.value;
    const password = password_tag.value;

    const storage_account = localStorage.account;
    const storage_account_js = JSON.parse(storage_account);

    if(storage_account_js[email] === undefined) {
        currentUser = email;
        storage_account_js[email] = password;
        localStorage.account = JSON.stringify(storage_account_js);
        let tarjetaBienvenida = document.createElement("div");
            let header = document.getElementById("header")
            tarjetaBienvenida.className = "tarjeta_bienvenida";
            tarjetaBienvenida.innerHTML = `
                 <p>Cuenta creada con exito</p>
            `
            let main = document.querySelector(".main");
            main.style.display = "block";
            
            header.append(tarjetaBienvenida)
    } else {
        let tarjetaBienvenida = document.createElement("div");
            let header = document.getElementById("header")
            tarjetaBienvenida.className = "tarjeta_bienvenida";
            tarjetaBienvenida.innerHTML = `
                 <p>Cuenta ya existente</p>
            `
            header.append(tarjetaBienvenida)
    }
 }


function principal () {

    fetch("./products.json")
    .then(res => res.json())
    .then(json => {
        const arrProductos = json.data
        let carrito = [];
        crearTarjetasProductos (arrProductos)

       
        let selectCategorias = document.getElementById("categorias");
        selectCategorias.addEventListener("change", () => {
            let categoriaSeleccionada = selectCategorias.value;
            filtrarPorCategoria(categoriaSeleccionada, arrProductos);
            });
    })
    .catch(err => console.log("ocurrio un error ", err))
    
     
    
}

principal()


function verOcultarCarrito(e) {
    let carrito = document.getElementById("carrito");
    let contenedorProductos = document.getElementById("contenedor")


    carrito.classList.toggle("oculta")
    contenedorProductos.classList.toggle("oculta")

}


function crearTarjetasProductos (arrProductos) {
  let contenedor = document.getElementById("contenedor");
  
  let agregarProductoAlCarritoWrapper = (e) => agregarProductoAlCarrito(e, arrProductos, carrito);

  arrProductos.forEach(producto => {
    let mensaje = "Unidades: " + producto.stock;

    if(producto.stock < 5) {
      mensaje = "Quedan pocas unidades";
    }

  
    if (contenedor.hasChildNodes()) {
      let btnAgregarAlCarrito = document.getElementsByClassName("btnAgregarAlCarrito");
      for (const boton of btnAgregarAlCarrito) {
        boton.removeEventListener("click", agregarProductoAlCarritoWrapper);
      }
    }

    let tarjetaProducto = document.createElement("div");
    tarjetaProducto.className = "producto";
    tarjetaProducto.innerHTML = `
      <img src="./images/${producto.rutaImagen}"/>
      <h3>${producto.nombre} </h3>
      <p>${mensaje}</p>
      <p>$${producto.precio}</p>
      <button class="btnAgregarAlCarrito" id=${producto.id}>Agregar al carrito</button>
      `
    contenedor.append(tarjetaProducto)
    let btnAgregarAlCarrito = document.getElementsByClassName("btnAgregarAlCarrito")

    for (const boton of btnAgregarAlCarrito) {
      boton.addEventListener("click", agregarProductoAlCarritoWrapper)
    }

    let botonCarrito = document.getElementById("productosCarrito")
    botonCarrito.addEventListener("click", verOcultarCarrito)

  });
}

function agregarProductoAlCarrito(e, arrProductos, carrito) {
    let id = Number(e.target.id)
    let productoOriginal = arrProductos.find(producto => producto.id === id)
    let indiceProductoCarrito = carrito.findIndex(producto => producto.id === id)
    let agregadoExito = false;
    let tarjetaProducto = e.target.parentNode;
    if(indiceProductoCarrito === -1) {
        carrito.push({
            id: productoOriginal.id,
            nombre: productoOriginal.nombre,
            precio: productoOriginal.precio,
            unidades: 1,
            subtotal: productoOriginal.precio
        })
        agregadoExito = true
    } else {
        if (productoOriginal.stock > carrito[indiceProductoCarrito].unidades) {
            carrito[indiceProductoCarrito].unidades++
            carrito[indiceProductoCarrito].subtotal = carrito[indiceProductoCarrito].precio * carrito[indiceProductoCarrito].unidades
            agregadoExito = true
        } else {
            let mensajeError = document.createElement("p");
            mensajeError.className = "mensajeErrorStock";
            mensajeError.innerText = "No hay más stock disponible.";
            mensajeError.style.color = "red";
            mensajeError.style.fontSize = "12px";
            tarjetaProducto.append(mensajeError);
        }
    }
    if(agregadoExito === true) {
        const localStorage_cart = JSON.parse(localStorage.cart);
        if(localStorage_cart[currentUser] === undefined) {
            localStorage_cart[currentUser] = carrito;
        } else {
            localStorage_cart[currentUser] = carrito;
        }
        localStorage.cart = JSON.stringify(localStorage_cart);
    }



    mostrarProductosEnCarrito(carrito)
    Swal.fire({
        title: "Producto agregado",
        text: `Se agrego ${productoOriginal.nombre} al carrito`,
        icon: "success",
        confirmButtonText: "Aceptar"
    });
}



function mostrarProductosEnCarrito (carrito) {
    let contenedorCarrito = document.getElementById("carrito");
    contenedorCarrito.innerHTML = ""
    let total = 0;

    if (carrito.length === 0) {
        let emptyMessage = document.createElement("div");
        emptyMessage.className = "totalCarrito";
        emptyMessage.innerHTML = `<h3>No hay productos añadidos</h3>`;
        contenedorCarrito.append(emptyMessage);
        return;
    }


    carrito.forEach(producto => {
        let tarjetaCarrito = document.createElement("div");
        tarjetaCarrito.className = "tarjetaCarrito";
        tarjetaCarrito.id = producto.id;
        tarjetaCarrito.innerHTML = `
        <p>${producto.nombre}</p>
        <p>$${producto.precio}</p>
        <p id="unidades_${producto.id}">Unidades: ${producto.unidades}</p>
        <button id="decrementar_${producto.id}" class="decrement_btn">-</button>
        <p>Total: ${producto.subtotal}</p>
        <button id="borrar_${producto.id}" class="delete_btn">X</button>
        `

        contenedorCarrito.append(tarjetaCarrito);
        let btnDecrementar = document.getElementById(`decrementar_${producto.id}`);
        let btnBorrar = document.getElementById(`borrar_${producto.id}`);

        btnDecrementar.addEventListener("click", (e) => {
            let id = e.target.parentNode.id;
            let nodoUnidades = document.getElementById(`unidades_${producto.id}`)
            decrementarCarrito(Number(id),carrito,nodoUnidades )
        })

        btnBorrar.addEventListener("click", (e) => {
            let id = e.target.parentNode.id;
            borrarProductoDelCarrito(Number(id),carrito)
        })
        total += producto.subtotal;
    });

    let totalDisplay = document.createElement("div");
    totalDisplay.className = "totalCarrito";
    totalDisplay.id = "btn_pagar"
    totalDisplay.innerHTML = `<h3>Total a pagar: $${total}</h3>`;
    contenedorCarrito.append(totalDisplay);

    totalDisplay.addEventListener("click", (e)=> {
        if(e.target.id === "btn_pagar") {
            pagar(carrito)
        }
    })
}
mostrarProductosEnCarrito(carrito);

function decrementarCarrito (id, carrito, nodo) {
    let productoCarrito = carrito.find((producto) => producto.id === id)
    if(productoCarrito.unidades > 1) {
        productoCarrito.unidades--;
        productoCarrito.subtotal = productoCarrito.precio * productoCarrito.unidades;
        nodo.innerText = `Unidades: ${productoCarrito.unidades}`
    } else {
        let index = carrito.findIndex(producto => producto.id === id);
        if (index !== -1) {
            carrito.splice(index, 1);
        }        
    }
    mostrarProductosEnCarrito(carrito);
}

function borrarProductoDelCarrito (id, carrito) {
    let productoCarrito = carrito.find((producto) => producto.id === id)
    carrito = carrito.filter(producto => producto.id !== id);
    mostrarProductosEnCarrito(carrito);
}

function filtrarPorCategoria(categoriaSeleccionada, arrProductos) {
    let productosFiltrados = arrProductos.filter(producto =>
        categoriaSeleccionada === "todos" || producto.categoria === categoriaSeleccionada
    );

    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    crearTarjetasProductos(productosFiltrados);
}

function pagar(arrCarrito) {
        let contenedorCompra = document.getElementById("contenedorMensajeCompra")
        let localStorage_history = JSON.parse(localStorage.history);
        if(localStorage_history[currentUser] === undefined) {
            localStorage_history[currentUser] = arrCarrito;
        } else {
            localStorage_history[currentUser] = arrCarrito;
        }
        localStorage.history = JSON.stringify(localStorage_history);
        let localStorage_cart = JSON.parse(localStorage.cart)
        localStorage_cart[currentUser] = "";
        localStorage.cart = JSON.stringify(localStorage_cart);

        contenedorCompra.innerHTML = "";
        let mensajeCompra = document.createElement("div");
        mensajeCompra.className = "mensajeCompraExitosa";
        mensajeCompra.innerHTML = `
            <h3>¡Compra realizada con éxito!</h3>
            <p>Gracias por tu compra. Tus productos llegarán pronto.</p>
        `;
        contenedorCompra.appendChild(mensajeCompra);
        arrCarrito = [];

    mostrarProductosEnCarrito(arrCarrito)

    setTimeout(() => {
        if (contenedorCompra.contains(mensajeCompra)) {
            contenedorCompra.removeChild(mensajeCompra);
        }
    }, 4000);
}