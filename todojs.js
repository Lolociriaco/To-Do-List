//VARIABLES:

var boton = document.getElementById("enter");
var input = document.getElementById("userInput");
var lista = document.querySelector("ul");
let allTasks = [];


//EVENT LISTENER


input.addEventListener("keydown", addAfterKeypress);

boton.addEventListener("click", addTask);

document.querySelectorAll(".contenedor li").forEach(element => {
    element.addEventListener("click", taskDone);
});

document.addEventListener('DOMContentLoaded', () => {
    allTasks = JSON.parse( localStorage.getItem('tasks')) || [];

    console.log(allTasks);

    createHtml();
})


//FUNCIONES


function taskDone(event){
    event.target.classList.toggle("completed");
}

function deleteTask(id){
    allTasks = allTasks.filter( t => t.id !== id); //filtro la tarea con id distinto al que seleccione y lo añado nuevamente a alltasks
    createHtml();
}

function inputValue()
{
    return input.value.length;
}

function newListElement(task)
{
    var li = document.createElement("li");
    li.textContent = task.task;
    li.classList.add("taskText");

    li.addEventListener("click", taskDone);

    
    var botonEliminacion = document.createElement("button");
    botonEliminacion.textContent = 'Delete';
    botonEliminacion.classList.add("deleteButton");
    botonEliminacion.onclick = () => {
        deleteTask(task.id);
    }

    li.appendChild(botonEliminacion);
    lista.appendChild(li);

    input.value = "";
}

function addToLocalStorage()
{
    const taskObj = {
        id: Date.now(),
        task: input.value
    }

    allTasks = [...allTasks, taskObj];

    console.log(allTasks);

    createHtml();
}


function addAfterKeypress(event)
{
    if(inputValue() > 0 && event.key === "Enter")
    {
       addToLocalStorage();
    }
    else if(event.key === "Enter")
    {
        errorMensaje('A task can not be empty');
    }

}



function addTask(){
    if(inputValue() > 0)
        {
            addToLocalStorage();
        }else
        {
            errorMensaje('A task can not be empty');
        }
        
    }
    

function errorMensaje(error){
    var ul = document.querySelector("ul");

    const errorOfMsj = document.createElement('p');
    errorOfMsj.textContent = error;
    errorOfMsj.classList.add('error');
    
    ul.appendChild(errorOfMsj);

    setTimeout(() => {
        errorOfMsj.remove();
    },1000);
}


function createHtml(){

    cleanHtml();

    if(allTasks.length > 0){
        allTasks.forEach(task =>{

            newListElement(task);

        })
    }

    sincronizeStorage();
}


function cleanHtml(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
}

function sincronizeStorage(){
    localStorage.setItem('tasks', JSON.stringify(allTasks));

}