var boton = document.getElementById("enter");
var input = document.getElementById("userInput");
var lista = document.querySelectorAll("ul");

function taskDone(event){
    event.target.classList.toggle("completed");
}

function inputValue()
{
    return input.value.length;
}

function newListElement()
{
    var li = document.createElement("li");
    var ul = document.querySelector("ul");
    li.appendChild(document.createTextNode(input.value));
    li.addEventListener("click", taskDone);
    botonEliminacion = document.createElement("button");
    botonEliminacion.value = "remove";
    botonEliminacion.classList.add("completed")
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
