var btnSave = document.getElementById("btnSave");
var categorias = [];
var editando = -1;

btnSave.onclick = () => {
    let txtCategoria = document.getElementById("categoria");
    
    if (txtCategoria.value == "") {
        alert("ERROR: CAMPO VACIO");
        return;
    }

    if (editando >= 0) {
        categorias[editando].categoria = txtCategoria.value;
        editando = -1;
    } else {
        const itemCategoria = {
            categoria: txtCategoria.value
        }
        categorias.push(itemCategoria);
    }

    localStorage.setItem("categorias", JSON.stringify(categorias));

    cerrarModal("addProducto");
    cargarCategorias();
    
    txtCategoria.value = "";
}

const cargarCategorias = () => {
    let posicion = 0;
    let datos = localStorage.getItem("categorias");
    categorias = datos ? JSON.parse(datos) : [];
    
    let tbody = document.getElementById("productos");
    var tabla = "";
    
    categorias.map((item) => {
        tabla += `<tr class="text-center">
            <td><b>${item.categoria.toUpperCase()}</b></td>
            <td>
                <button type="button" class="btn-solid btn-styled theme-danger" onclick="eliminarCategoria(${posicion})"><i class="bi bi-trash3"></i></button>
                <button type="button" class="btn-solid btn-styled theme-warning" onclick="editarCategoria(${posicion})"><i class="bi bi-pencil"></i></button>
            </td>
            </tr>`;
            posicion++;
    });
    if (tbody) {
        tbody.innerHTML = tabla;
    }
}

const cerrarModal = (idModal) => {
    const modalElement = document.getElementById(idModal);
    if (modalElement) {
        modalElement.close();
    }
    editando = -1;
    let txtCategoria = document.getElementById("categoria");
    if (txtCategoria) {
        txtCategoria.value = "";
    }
}

cargarCategorias();

const editarCategoria = (posicion) => {
    editando = posicion;
    const categoriaSeleccionada = categorias[posicion];
    let txtCategoria = document.getElementById("categoria");
    if (txtCategoria) {
        txtCategoria.value = categoriaSeleccionada.categoria;
    }
    const modalElement = document.getElementById("addProducto");
    if (modalElement) {
        modalElement.showModal();
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

const eliminarCategoria = (posicion) => {
  swalWithBootstrapButtons.fire({
    title: "ELIMINAR REGISTRO",
    text: "¿Estás seguro de eliminar este registro?",
    icon: "error",
    showCancelButton: true,
    confirmButtonText: "SI",
    cancelButtonText: "NO",
    reverseButtons: true
  }).then((result) => {
    if(result.isConfirmed) {
        categorias.splice(posicion, 1);
        localStorage.setItem("categorias", JSON.stringify(categorias));
        cargarCategorias();
        
        negro.fire({title: "ELIMINADO", text: "Registro eliminado correctamente", icon: "success"});
    }
  });
}