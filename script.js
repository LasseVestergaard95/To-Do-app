"use strict";

// globale arrays
const activeArr = [];
const doneArr = [];

// vi har defineret denne funktion med onclick i vores HTML. Funktionen tager de værdier den får fra task og quantity, laver dem om til objekter og bliver derefter smidt i et array med navnet activeArr.
function storeInput() {
  const task = document.getElementById("task");
  const quantity = document.getElementById("quantity");

  const taskValue = task.value;
  const quantityValue = quantity.value;
// done bliver som udgangspunktet defineret til 'false' da den jo er aktiv indtil den bliver checked.
  const taskObj = { task: taskValue, quantity: quantityValue, done: false };

  // her bliver vores nye objekt pushet ind i vores array med aktive tasks.
  activeArr.push(taskObj);

  addTask();

  // de to inputfelter bliver resettet så man som bruger ikke skal slette det man skrev tidligere.
  task.value = "";
  quantity.value = "";

  console.log(activeArr);
}

// denne funktion tager activeArr og appender det nye objekts værdier til list items. 
function addTask() {
  const ulActive = document.getElementById("active_list");
  ulActive.innerHTML = "";

  // vi looper igennem hvert objekt. Udover at vise hvert objekt, vil vi gerne have en checkbox som vi kan hakke af i når opgaven er done. Dette fører os ned i en ny funktion.
  activeArr.forEach((taskObj) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = taskObj.done;
    checkbox.addEventListener("change", () => {
      taskObj.done = checkbox.checked;
      if (taskObj.done) {
        moveToDone(taskObj);
      }
    });

    const taskText = document.createTextNode(`${taskObj.task} ${taskObj.quantity}`);
    li.appendChild(checkbox);
    li.appendChild(taskText);
    ulActive.appendChild(li);
  });
}

function moveToDone(taskObj) {
  const ulDone = document.getElementById("done_list");
  
  if (!taskObj.hasOwnProperty("done")) {
    taskObj.done = false; // Initialize "done" property if it doesn't exist
  }

  doneArr.push(taskObj);
  const index = activeArr.indexOf(taskObj);
  if (index !== -1) {
    activeArr.splice(index, 1);
  }
  
  ulDone.innerHTML = ""; // Clear the done list and recreate it.
  doneArr.forEach((taskObj) => {
    const li = document.createElement("li");
    const taskText = document.createTextNode(`${taskObj.task} ${taskObj.quantity}`);
    li.appendChild(taskText)
    ulDone.appendChild(li);
  });
  
  addTask();
}
