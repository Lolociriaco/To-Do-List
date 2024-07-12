var boton = document.getElementById("enter");
var input = document.getElementById("userInput");
var lista = document.querySelectorAll("ul");

function taskDone(event){
    event.target.classList.toggle("completed");
}

function deleteTask(event){
    event.target.parentElement.remove();
}

function inputValue()
{
    return input.value.length;
}

function newListElement()
{
    var li = document.createElement("li");
    var ul = document.querySelector("ul");
    li.append(document.createTextNode(input.value));
    li.classList.add("taskText");
    li.addEventListener("click", taskDone);

    botonEliminacion = document.createElement("button");
    botonEliminacion.append(document.createTextNode("BORRAR"));
    botonEliminacion.classList.add("deleteButton");
    botonEliminacion.addEventListener("click", deleteTask);

    li.appendChild(botonEliminacion);
    ul.appendChild(li);
    input.value = "";
}

function addAfterKeypress(event)
{
    if(inputValue() > 0 && event.key === "Enter")
        {
           newListElement(); 
        }
}

function addTask(){
    if(inputValue() > 0)
    {
        newListElement();
    }
    
}

input.addEventListener("keydown", addAfterKeypress);

boton.addEventListener("click", addTask);

document.querySelectorAll(".contenedor li").forEach(element => {
    element.addEventListener("click", taskDone);
});
