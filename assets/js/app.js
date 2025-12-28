// Buscador de Recetas - Sprint 2

const formulario = document.querySelector('form');
const inputBusqueda = document.querySelector('.form-control');
const contenedorResultados = document.querySelector('.results-section .row');

// Formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const ingrediente = inputBusqueda.value.trim();

    if (ingrediente === '') {
        return;
    }

    buscarRecetas(ingrediente);
});

// buscar recetas
const buscarRecetas = async (ingrediente) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        mostrarRecetas(datos.meals);
    } catch (error) {
        console.error('Error al buscar recetas:', error);
    }
};

// mostrar recetas
const mostrarRecetas = (recetas) => {
    limpiarResultados();

    if (recetas === null) {
        mostrarMensajeError();
        return;
    }

    recetas.forEach((receta) => {
        const { strMeal, strMealThumb } = receta;

        const tarjeta = `
            <div class="col-lg-4 col-md-6">
                <div class="card h-100">
                    <img src="${strMealThumb}" class="card-img-top" alt="${strMeal}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${strMeal}</h5>
                        <a href="#" class="btn btn-primary mt-auto">Ver Receta</a>
                    </div>
                </div>
            </div>
        `;

        contenedorResultados.insertAdjacentHTML('beforeend', tarjeta);
    });
};

// limpiar resultados anteriores
const limpiarResultados = () => {
    contenedorResultados.innerHTML = '';
};

// mostrar mensaje cuando no hay resultados
const mostrarMensajeError = () => {
    const mensaje = `
        <div class="col-12">
            <div class="alert alert-warning text-center" role="alert">
                Lo sentimos, no encontramos recetas con ese ingrediente.
            </div>
        </div>
    `;

    contenedorResultados.innerHTML = mensaje;
};
