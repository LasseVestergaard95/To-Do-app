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

  console.log("aktive opgaver", activeArr);
}

// denne funktion tager activeArr og appender det nye objekts værdier til list items.
function addTask() {
  const ulActive = document.getElementById("active_list");
  ulActive.innerHTML = "";
  const ulDone = document.getElementById("done_list");
  ulDone.innerHTML = "";

  // vi looper igennem hvert objekt. Udover at vise hvert objekt, vil vi gerne have en checkbox som vi kan hakke af i når opgaven er done. Dette fører os ned i en ny funktion. Det samme gælder for delete knappen.
  activeArr.forEach((taskObj) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const taskText = document.createTextNode(`${taskObj.quantity} ${taskObj.task} `);
    const deleteBtn = document.createElement("button");
    checkbox.type = "checkbox";
    checkbox.checked = taskObj.done;
    deleteBtn.innerHTML = "slet";
    deleteBtn.addEventListener("click", () => deleteTask(taskObj));

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    ulActive.appendChild(li);

    checkbox.addEventListener("change", () => {
      taskObj.done = checkbox.checked;
      if (taskObj.done) {
        doneArr.push(taskObj);
        const index = activeArr.indexOf(taskObj);
        activeArr.splice(index, 1);

        ulDone.innerHTML = "";
        doneArr.forEach((taskObj) => {
          ulDone.appendChild(li);
          console.log("doneArr", doneArr);

        });
      }
    });
  });
}

function deleteTask(taskObj) {
  if (taskObj.done) {
    doneArr.splice(doneArr.indexOf(taskObj), 1);
  } else {
    activeArr.splice(activeArr.indexOf(taskObj), 1);
  }
  console.log("doneArr", doneArr);
  console.log("aktivArr", activeArr);

  addTask();
}
