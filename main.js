console.log('Espero tengas un excelente día🔥')
// Variables con los ID del HTML
const formulario = document.getElementById('formulario');
const input = document.getElementById('input');
const listaTarea = document.getElementById('lista-tarea');
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();

// Coleccion de Objetos
// let tareas = {
//     1636322799214: {
//         id: 1636322799214,
//         texto: 'Tarea 1',
//         estado: false
//     },

//     1636322913049: {
//         id: 1636322913049,
//         texto: 'Tarea 2',
//         estado: false
//     }
// };

let tareas = {};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }

    pintarTareas()
});

listaTarea.addEventListener('click', e => {
    btnAccion(e)
});

// console.log(Date.now())

formulario.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target.querySelector('input').value);
    // console.log(input.value)

    setTarea(e);
})

const setTarea = e => {

    if (input.value.trim() === '') {
        console.log('esta vacio')
        return;
    }
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }
    tareas[tarea.id] = tarea;
    // console.log(tareas)
    formulario.reset();
    pintarTareas()
};

const pintarTareas = () => {

    localStorage.setItem('tareas', JSON.stringify(tareas));

    if (Object.values(tareas).length === 0) {
        listaTarea.innerHTML = `
        <div class="alert alert-dark text-center">
           No tienes tareas pendientes😉
        </div>
        `
        return;
    }


    listaTarea.innerHTML = '';
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true);
        clone.querySelector('p').textContent = tarea.texto;

        if (tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-secondary', 'alert-success')
            clone.querySelectorAll('.uil')[0].classList.replace('uil-check-circle', 'uil-redo')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll('.uil')[0].dataset.id = tarea.id;
        clone.querySelectorAll('.uil')[1].dataset.id = tarea.id;

        fragment.appendChild(clone)
    });

    listaTarea.appendChild(fragment)
}

const btnAccion = e => {
    // console.log(e.target.classList.contains('uil-check-circle'))
    if (e.target.classList.contains('uil-check-circle')) {
        console.log(e.target.dataset.id)
        tareas[e.target.dataset.id].estado = true;
        pintarTareas()
        // console.log(tareas)
    }

    if (e.target.classList.contains('uil-trash-alt')) {
        delete tareas[e.target.dataset.id];
        pintarTareas()
        // console.log(tareas)
    }

    if (e.target.classList.contains('uil-redo')) {

        tareas[e.target.dataset.id].estado = false;
        pintarTareas()
        // console.log(tareas)
    }


    e.stopPropagation()
}