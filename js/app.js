const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const fragment = document.createDocumentFragment();
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("templateFooter");
let carritoObjeto = [];

document.addEventListener("click", (e) =>{
if(e.target.matches('.card .btn-primary')){
    console.log("ejecutar agregar al carrito")
    agregarCarrito(e);
}
if(e.target.matches("#carrito .list-group-item .btn-success")){
    btnAumentar(e);
}
if(e.target.matches("#carrito .list-group-item .btn-danger")){
    btnDisminuir(e);
}
});

const agregarCarrito = (e) => {
    // console.log(e.target.dataset);
    // console.log(e.target.dataset.fruta);
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio), 
    };

    console.log(producto);

    const indice = carritoObjeto.findIndex((item) => item.id === producto.id);
    console.log(indice);
    if(indice === -1){ //si es -1 significa que no existe y se agrega primera vez
        carritoObjeto.push(producto);
    }else{
        carritoObjeto[indice].cantidad ++;
        // carritoObjeto[indice].precio = carritoObjeto[indice].cantidad * producto.precio;
    }
    pintarCarrito();
};

const pintarCarrito = () => {
    carrito.textContent = "";
    carritoObjeto.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".lead").textContent = item.titulo;
        clone.querySelector(".rounded-pill").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent =  item.precio * item.cantidad;

        clone.querySelector(".btn-danger").dataset.id = item.id;
        clone.querySelector(".btn-success").dataset.id = item.id;
        
        fragment.appendChild(clone);
    });
    carrito.appendChild(fragment);
    
    pintarFooter();
};

const pintarFooter = () =>{
footer.textContent = "";
const total = carritoObjeto.reduce((acc, current) => acc + current.cantidad * current.precio,0)
if(total>0){
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector(".lead span").textContent = total;
    fragment.appendChild(clone);
    footer.appendChild(fragment);
}
};



const btnAumentar = (e) =>{
    console.log("me diste click ",e.target.dataset.id);
    
}
const btnDisminuir = (e) =>{
    console.log("me diste click ",e.target.dataset.id);
    carritoObjeto = carritoObjeto.filter(item =>{
        if(item.id == e.target.dataset.id){
                if(item.cantidad>0){
                    item.cantidad--
                    if(item.cantidad=== 0) return
                    return item
                }
        }else{
            return item
        }
    });
    pintarCarrito();
};