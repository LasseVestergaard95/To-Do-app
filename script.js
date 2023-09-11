"use strict";
// ved at gøre consten global, kan vi bruge den flere steder i vores JS
const activeArr = [];

function storeInput() {
  const task = document.getElementById("task");
  const quantity = document.getElementById("quantity");

  const taskVærdi = task.value;
  const quantityVærdi = quantity.value;

  const taskObj = { task: taskVærdi, quantity: quantityVærdi };

//   her tilføjer du det enkelte objekt til det globale array (activeArr)
  activeArr.push(taskObj);

  addTask();

//   smart funktion som gør at hver gang du trykker på "tilføj", så resetter den de to inputfelter så du ikke skal slette det du skrev lige før.
  task.value ="";
  quantity.value = "";

  console.log(activeArr);
}
function addTask() {
  const ul = document.getElementById("active_list")




//   denne funktion giver listen en "reset" så den kun viser det opdaterede array. Hvis den ikke er det vil den tilføje samtlige objekter hver gang du trykker "tilføj"
  ul.innerHTML = "";

  activeArr.forEach((taskObj) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskObj.done;
    
    
    const taskText = document.createTextNode(`${taskObj.task} ${taskObj.quantity}`);
    li.appendChild(checkbox)
    li.appendChild(taskText)
    ul.appendChild(li);
  });
}
