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


class Producto {
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}


alert("Bienvenido a tal Store");
let opcionMenuPrincipal;
let arrProductos = setAlmacen();
let arrCarrito = [];
let lista = "";
let carrito = {};


menuPrincipal: do {
    opcionMenuPrincipal = Number(prompt("1 - Ver lista de productos\n2 - Anadir producto\n3 - Ver carrito\n4 - Finalizar compra\n5 - Salir"));

    switch (opcionMenuPrincipal) {
        case 1:
            arrProductos.forEach((producto) => lista += `${producto.id} - ${producto.nombre}\n`);
            alert(lista);
            lista = "";
            continue menuPrincipal;
        case 2:

            let agregarProducto;
            let opcionAnadirProducto;
            do {
                agregarProducto = Number(prompt("Que producto deseas anadir?"))
                if (comprobarInput(agregarProducto, arrProductos.length)) {
                arrCarrito.push(arrProductos[agregarProducto-1]);
                agregarAlCarrito(agregarProducto)
                alert(`Has agregado ${arrCarrito[arrCarrito.length-1].nombre}`);
                opcionAnadirProducto = Number(prompt("1 - Para seguir anadiendo productos\n2 - Para volver al menu principal"))
                if(comprobarInput(opcionAnadirProducto, 2)) {
                    if(opcionAnadirProducto === 1) {
                        continue;
                    } else {
                        continue menuPrincipal;
                    }
                }
                continue;
                } else { 
                    continue menuPrincipal;
                }
            } while (true); 
            
        case 3:
            let opcionCarrito;
            let idProductoEliminar;

            do {
                opcionCarrito = Number(prompt("1 - Ver carrito\n2 - Eliminar producto del carrito\n3 - Volver al menu principal"));
                if(comprobarInput(opcionCarrito,3)) {
                    if(opcionCarrito === 1 ){
                        if(arrCarrito.length === 0) {
                            alert("No hay productos anadidos");
                        } else {
                            arrCarrito.forEach((producto) => lista += `${producto.id} - ${producto.nombre}\n`);
                            alert(lista);
                            lista = "";
                        }
                        continue;
                    } else if(opcionCarrito === 2) {
                        let newArr = [];
                        idProductoEliminar = Number(prompt("Indique el id del producto a eliminar"));
                        if(buscarProducto(idProductoEliminar, arrCarrito) !== null){

                            let productoEliminado = buscarProducto(idProductoEliminar, arrCarrito);
                            if(carrito[productoEliminado.nombre] !== undefined) {
                                carrito[productoEliminado.nombre]--;
                                for(const nombre in carrito) {
                                    let n = carrito[nombre];
                                    let p;
                                    for(let i = 0; i < arrCarrito.length; i++) {
                                        if(arrCarrito[i].nombre === nombre) {
                                            p = arrCarrito[i];
                                            break;
                                        }
                                    }
                                    for(let i = 0; i < n; i++) {
                                        newArr.push(p);
                                    } 
                                }
                                arrCarrito = newArr;
                                alert(`Producto eliminado ${productoEliminado.nombre}`);
                                continue menuPrincipal;
                            } else {
                                alert("El producto no se ha agregado")
                                continue menuPrincipal;
                            }
                        }
                    } else if(opcionCarrito === 3) {
                        continue menuPrincipal;
                    }
                }
                continue menuPrincipal;
            } while (true);
           
        case 4:
            let opcionConfirmarCompra;
            if(arrCarrito.length === 0) {
                alert("No has agregado productos al carrito")
            } else {
                alert(`El costo total de sus productos es de:$ ${calcularTotal(arrCarrito)}`)
                opcionConfirmarCompra = Number(prompt("1 - Para confirmar compra\n2 - Para volver al menu principal"))
                comprobarInput(opcionConfirmarCompra,2)
                if(opcionConfirmarCompra === 1) {
                    alert(`Su compra ha sido confirmada! Valor total: $${calcularTotal(arrCarrito)}`)
                    arrCarrito = [];
                }  
                continue menuPrincipal;
            }
            continue menuPrincipal;
        case 5:
            alert("Hasta luego!");
            break;
    
        default:
            comprobarInput(opcionMenuPrincipal, 5)
            continue menuPrincipal;
    }
    break;
} while (true);


function setAlmacen () {
    const nombreProductos =   ["camisa blanca" ,      "zapatos deportivos",   "zapatos lifestyle", "camisa negra", "chaqueta oversized blanca", "camisa oversized gris"];
    const precioProductos =   [30,                      170,                        140,                30,                     70,                         45          ];
    const cantidadProductos = [10,                       5,                           7,                10,                     5,                           9          ];
    
    const arrInstancias = [];

    for(let i = 0; i < nombreProductos.length; i++) {
        let t = new Producto(i+1, nombreProductos[i], precioProductos[i], cantidadProductos[i]);
        arrInstancias.push(t);
    }
    
    return arrInstancias;
}

function comprobarInput (opc, limite) {
    let n = Number(opc);
    if(Number.isNaN(n) ) {
        alert("Ingrese una opcion valida");
        return false;
    } else if(opc <= 0 || opc > limite){
        alert("Ingrese una opcion valida");
        return false;
    } else {
        return true;
    }
}

function buscarProducto (id, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(id === arr[i].id) {
            return arr[i];
        } 
    }
    return null;
}

function calcularTotal (arr) {
    let total = 0;
    arr.forEach((producto) => total += producto.precio)
    return total
}

function agregarAlCarrito (id) {
    let nombre = buscarProducto(id, arrProductos).nombre;
    if(carrito[nombre] !== undefined) {
        carrito[nombre]++;
    } else {
        carrito[nombre] = 1;
    }
}


