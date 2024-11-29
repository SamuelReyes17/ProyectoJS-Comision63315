/*requerimientos
* clases, objetos, array, busqueda y filtrado.

Prompt menu

1. lista ---> {id:number, value:number, name:string, quantity:number}
3. añadir ---> name | id
4. ver carrito ---> lista ->  productos agregados
5. eliminar del carrito.
6. compra ---> restar quantity -1.
        |
        *--> confirmación una compra por X valor.

PASOS
[0] Crear el menu, crear el array del carrito de compras.


[1] lista:
        1. Crear clase de los productos y sus instancias
                CLASES
                Producto -----> {}{}{}{}{}{};

        2. Crear un array y meter los productos
                [{instancia producto 1},{instancia producto 2},{instancia producto 3}...]

[2] añadir:
        1. Prompt: Qué producto quiere añadir de la lista de productos (id | string).
        2. Comprobar el input. (números o letras)
                |
                *--> Alert: éxito
                |
                *--> Alert: No existe.
        3. Añadimos el producto al carrito

[4] ver carrito:
        1. Alert: mostrar lista de productos.

[5] eliminar del carrito:
        1. Revisar que el carrito no esté vacío.
                |
                *--> Alert: éxito, preguntarle qué producto hay que eliminar.
                |
                *--> Alert: Si el carro está vacío se le avisa al usuario.

        2. Comprobar el input. (números o letras)
                |
                *--> Alert: éxito == se borró.
                |
                *--> Alert: No existe == avisar al usuario.

[6] Compra:
        1. Mostrar el total.
        2. Prompt confirmación.
        3. Prompt: éxito.
        4. Restar el quantity de cada producto comprado.
       
*/

set_storage()
const buttonLogin = document.querySelector("#btn_login");
const buttonSignUp = document.getElementById("btn_signup")

buttonLogin.addEventListener("click", login);
buttonSignUp.addEventListener("click",  signUp);

function set_storage () {
    if(localStorage.account === undefined) {
        localStorage.setItem("account", "{}");
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
            let tarjetaBienvenida = document.createElement("div");
            let header = document.getElementById("header")
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
            tarjetaBienvenida.className = "tarjeta_bienvenida";
            tarjetaBienvenida.innerHTML = `
                 <p>Contrasena incorrecta</p>
            `
            header.append(tarjetaBienvenida)
        }
    } else {
        let tarjetaBienvenida = document.createElement("div");
        let header = document.getElementById("header")
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

    let arrProductos = [
        {id: 1, nombre: "Camisa blanca oversized", precio: 50, stock: 15, categoria: "ropa", rutaImagen: "camisablanca.png"},
        {id: 2, nombre: "Camisa negra oversized", precio: 50, stock: 7, categoria: "ropa", rutaImagen: "camisanegra.png"},
        {id: 3, nombre: "Camisa gris oversized", precio: 50, stock: 11, categoria: "ropa", rutaImagen: "camisagris.png"},
        {id: 4, nombre: "Camisa azul oversized", precio: 50, stock: 3, categoria: "ropa", rutaImagen: "camisaazul.png"},
        {id: 5, nombre: "Hoodie negro oversized", precio: 90, stock: 9, categoria: "ropa", rutaImagen: "hoodienegro.png"},
        {id: 6, nombre: "Hoodie blanco oversized", precio: 90, stock: 3, categoria: "ropa", rutaImagen: "hoodiegris.png"},
        {id: 7, nombre: "Gorra nerga", precio: 50, stock: 15, categoria: "accesorios", rutaImagen: "gorranegra.png"},
        {id: 8, nombre: "Gorra verde", precio: 50, stock: 15, categoria: "accesorios", rutaImagen: "gorraverde.png"},
        {id: 9, nombre: "Gafas de sol", precio: 30, stock: 20, categoria: "accesorios", rutaImagen: "gafasdesol.png"},
        {id: 10, nombre: "Gafas running", precio: 30, stock: 7, categoria: "accesorios", rutaImagen: "gafasrunning.png"},
        {id: 11, nombre: "Baggy jean", precio: 80, stock: 22, categoria: "ropa", rutaImagen: "baggyjean.png"},
        {id: 12, nombre: "Baggy cargos", precio: 110, stock: 12, categoria: "ropa", rutaImagen: "cargopant.png"},
        {id: 13, nombre: "Baggy cargos", precio: 110, stock: 9, categoria: "ropa", rutaImagen: "cargopant2.png"},
        {id: 14, nombre: "Cargo shorts", precio: 60, stock: 4, categoria: "ropa", rutaImagen: "cargoshorts.png"},
        {id: 15, nombre: "Running shorts", precio: 70, stock: 15, categoria: "ropa", rutaImagen: "runningshort.png"}
    
     ]
     let carrito = [];
     crearTarjetasProductos (arrProductos)

     let btnAgregarAlCarrito = document.getElementsByClassName("btnAgregarAlCarrito")
     for (const boton of btnAgregarAlCarrito) {
        boton.addEventListener("click", (e) => agregarProductoAlCarrito(e, arrProductos, carrito))
        
     }

     let botonCarrito = document.getElementById("productosCarrito")
     botonCarrito.addEventListener("click", verOcultarCarrito)

     
    
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
    arrProductos.forEach(producto => {
        let mensaje = "Unidades: " + producto.stock;

        if(producto.stock < 5) {
            mensaje = "Quedan pocas unidades";
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

    });
}

function agregarProductoAlCarrito(e, arrProductos, carrito) {
    let id = Number(e.target.id)
    let productoOriginal = arrProductos.find(producto => producto.id === id)
    let indiceProductoCarrito = carrito.findIndex(producto => producto.id === id)
    if(indiceProductoCarrito === -1) {
        carrito.push({
            id: productoOriginal.id,
            nombre: productoOriginal.nombre,
            precio: productoOriginal.precio,
            unidades: 1,
            subtotal: productoOriginal.precio
        })
    } else {
        if (productoOriginal.stock > carrito[indiceProductoCarrito].unidades) {
            carrito[indiceProductoCarrito].unidades++
            carrito[indiceProductoCarrito].subtotal = carrito[indiceProductoCarrito].precio * carrito[indiceProductoCarrito].unidades
        } else {
            alert("No hay mas stock disponible")
        }
    }

    console.log(carrito)

    mostrarProductosEnCarrito(carrito)
}

let carrito = [];

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
        <button id="decrementar_${producto.id}">-</button>
        <p>Total: ${producto.subtotal}</p>
        <button id="borrar_${producto.id}">X</button>
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
    totalDisplay.innerHTML = `<h3>Total a pagar: $${total}</h3>`;
    contenedorCarrito.append(totalDisplay);
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
