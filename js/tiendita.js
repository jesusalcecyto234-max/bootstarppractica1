var btnSave = document.getElementById("btnSave");
var btnEdit = document.getElementById("btnEdit");
var productos = [];

const cargarSelectCategorias = () => {
    let datos = localStorage.getItem("categorias");
    let listaCategorias = datos ? JSON.parse(datos) : [];
    
    ["categoria", "categoriae"].forEach(id => {
        let select = document.getElementById(id);
        if (select) {
            let opciones = '<option value="">Seleccione una categoría</option>';
            listaCategorias.forEach((item) => {
                let nombreCat = item.categoria || item.nombre || "";
                opciones += `<option value="${nombreCat}">${nombreCat.toUpperCase()}</option>`;
            });
            select.innerHTML = opciones;
        }
    });
};

const convertirBase64 = (event, targetId) => {
    let archivo = event.target.files[0];
    if (archivo) {
        let lector = new FileReader();
        lector.onload = (e) => {
            let inputImg = document.getElementById(targetId);
            if (inputImg) {
                inputImg.value = e.target.result;
            }
        };
        lector.readAsDataURL(archivo);
    }
};

btnSave.onclick = () => {
    let txtNombre = document.getElementById("nombre");
    let txtPrecio = document.getElementById("precio");
    let txtCantidad = document.getElementById("cantidad");
    let txtCategoria = document.getElementById("categoria");
    let txtImagen = document.getElementById("imagen");
    
    if (txtNombre.value == "" || txtPrecio.value == "" || txtCantidad.value == "" || txtCategoria.value == "" || txtImagen.value == "") {
        alert("ERROR: CAMPOS VACIOS");
        return;
    }

    const producto = {
        nombre: txtNombre.value,
        precio: txtPrecio.value,
        cantidad: txtCantidad.value,
        categoria: txtCategoria.value,
        imagen: txtImagen.value
    }

    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));

    cerrarModal("addProducto");
    cargarProductos();
    
    txtNombre.value = "";
    txtPrecio.value = "";
    txtCantidad.value = "";
    txtCategoria.value = "";
    txtImagen.value = "";
    let fileAdd = document.getElementById("imageFileAdd");
    if (fileAdd) fileAdd.value = "";
}

btnEdit.onclick = () => {
    let txtNombre = document.getElementById("nombree");
    let txtPrecio = document.getElementById("precioe");
    let txtCantidad = document.getElementById("cantidade");
    let txtCategoria = document.getElementById("categoriae");
    let txtImagen = document.getElementById("image");
    let posicion = document.getElementById("posicion");
    
    if (txtNombre.value == "" || txtPrecio.value == "" || txtCantidad.value == "" || txtCategoria.value == "" || txtImagen.value == "") {
        alert("ERROR: CAMPOS VACIOS");
        return;
    }

    productos[posicion.value].nombre = txtNombre.value;
    productos[posicion.value].precio = txtPrecio.value;
    productos[posicion.value].cantidad = txtCantidad.value;
    productos[posicion.value].categoria = txtCategoria.value;
    productos[posicion.value].imagen = txtImagen.value;
    localStorage.setItem("productos", JSON.stringify(productos));
    
    document.getElementById("editProducto").close();
    
    txtNombre.value = "";
    txtPrecio.value = "";
    txtCantidad.value = "";
    txtCategoria.value = "";
    txtImagen.value = "";
    let fileEdit = document.getElementById("imageFile");
    if (fileEdit) fileEdit.value = "";
    cargarProductos();
}

const cargarProductos = () => {
    let posicion = 0;
    let datos = localStorage.getItem("productos");
    productos = datos ? JSON.parse(datos) : [];
    
    let tbody = document.getElementById("productos");
    var tabla = "";
    
    productos.map((producto) => {
        let nombre = producto.nombre || "";
        let precio = producto.precio || 0;
        let cantidad = producto.cantidad || 0;
        let categoria = producto.categoria || "";
        let imagen = (producto.imagen && producto.imagen !== "undefined") ? producto.imagen : "";

        tabla += `<tr class="text-center">
            <td><b>${nombre.toUpperCase()}</b></td>
            <td><b>$ ${parseFloat(precio).toFixed(2)}</b></td>
            <td><b>${cantidad}</b></td>
            <td><b>${categoria.toUpperCase()}</b></td>
            <td>
                ${imagen ? `<img src="${imagen}" alt="${nombre}" width="50" height="50">` : '<span>Sin imagen</span>'}
            </td>
            <td>
                <button class="btn-solid btn-styled theme-danger" onclick="eliminarProducto(${posicion})"><i class="bi bi-trash3"></i></button>
                <button class="btn-solid btn-styled theme-warning" onclick="editarProducto(${posicion})"><i class="bi bi-pencil"></i></button>
            </td>
            </tr>`;
            posicion++;
    });
    if (tbody) {
        tbody.innerHTML = tabla;
    }
    totalPrecioProducto();
}

const cerrarModal = (idModal) => {
    const modalElement = document.getElementById(idModal);
    if (modalElement) {
        modalElement.close();
    }
}

cargarProductos();
cargarSelectCategorias();

const editarProducto = (posicion) => {
    const producto = productos[posicion];
    document.getElementById("nombree").value = producto.nombre;
    document.getElementById("precioe").value = producto.precio;
    document.getElementById("cantidade").value = producto.cantidad;
    document.getElementById("categoriae").value = producto.categoria;
    document.getElementById("image").value = producto.imagen;
    document.getElementById("posicion").value = posicion;
    
    const modal = document.getElementById("editProducto");
    if (modal) {
        modal.showModal();
    }
}

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn-solid btn-styled theme-success mx-5",
    cancelButton: "btn-solid btn-styled theme-danger"
  },
  buttonsStyling: false
});

const negro = Swal.mixin({
    customClass: {
        confirmButton: "btn-solid btn-styled theme-dark",
    },
    buttonsStyling: false
});

function totalPrecioProducto() {
    let sumaTotalPrecio = 0;
    let sumaTotalCantidad = 0;
    let sumaTotalGeneral = 0;

    productos.forEach(p => {
        let pPrecio = parseFloat(p.precio) || 0;
        let pCantidad = parseFloat(p.cantidad) || 0;
        sumaTotalPrecio += pPrecio;
        sumaTotalCantidad += pCantidad;
        sumaTotalGeneral += (pPrecio * pCantidad);
    });

    let tPrecio = document.getElementById("totalPrecio");
    let tCantidad = document.getElementById("totalCantidad");
    let tPrecioProducto = document.getElementById("totalPrecioProducto");

    if (tPrecio) tPrecio.textContent = `$ ${sumaTotalPrecio.toFixed(2)}`;
    if (tCantidad) tCantidad.textContent = sumaTotalCantidad; // Aquí se llena el total de cantidad
    if (tPrecioProducto) tPrecioProducto.textContent = `$ ${sumaTotalGeneral.toFixed(2)}`;
}

const eliminarProducto = (posicion) => {
  swalWithBootstrapButtons.fire({
    title: "ELIMINAR REGISTRO",
    text: "Estas seguro de eliminar este registro?",
    icon: "error",
    showCancelButton: true,
    confirmButtonText: "SI",
    cancelButtonText: "NO",
    reverseButtons: true
  }).then((result) => {
    if(result.isConfirmed) {
        productos.splice(posicion, 1);
        localStorage.setItem("productos", JSON.stringify(productos));
        cargarProductos();
        
        negro.fire({title: "ELIMINADO", text: "Registro eliminado correctamente", icon: "success"});
    }
  });
}