"use strict";
window.addEventListener("load", displayLocalTask);
const btn = document.querySelector("#add_button");
const toDoList = document.querySelector("#todo_table");
let taskArray = [];
const editBtn = document.querySelector("#edit_button");

editBtn.addEventListener("click", showEdit);

function showEdit() {
  document.querySelectorAll("#delete").forEach((btn) => {
    btn.classList.toggle("hidden");
    btn.addEventListener("click", delTask);
  });
}

function delTask(evt) {
  console.log("delete");
evt.
}

function displayLocalTask() {
  taskArray = JSON.parse(localStorage.getItem("array"));
  if (taskArray !== null) {
    console.log(taskArray);
    taskArray.forEach((task) => {
      const clone = document.querySelector("template").content.cloneNode(true);
      clone.querySelector("tr").id = task.id;
      clone.querySelector("[data-field=desc]").textContent = task.desc;
      clone.querySelector("[data-field=date]").textContent = task.date;
      //clone.querySelector("[data-field=fav]");
      toDoList.appendChild(clone);
    });
  }
}
btn.addEventListener("click", addTask);

function addTask(evt) {
  if (document.querySelector("#input_text").value !== "") {
    evt.preventDefault();
    const inputText = document.getElementById("input_text");
    const inputDate = document.getElementById("input_date");
    console.log(inputText);

    let idValue = 1;
    if (taskArray === null) {
      taskArray = [];
    }
    if (taskArray.length > 0) {
      idValue = taskArray[taskArray.length - 1].id + 1;
    }

    const task = {
      id: idValue,
      desc: inputText.value,
      date: inputDate.value,
      fav: false,
    };

    taskArray.push(task);

    localStorage.setItem("array", JSON.stringify(taskArray));

    console.log(taskArray);

    /// clear input

    inputText.value = "";
    inputDate.value = "";

    displayTask(task);
  }
}

function displayTask(task) {
  const clone = document.querySelector("template").content.cloneNode(true);
  clone.querySelector("tr").id = task.id;
  clone.querySelector("[data-field=desc]").textContent = task.desc;
  clone.querySelector("[data-field=date]").textContent = task.date;
  //clone.querySelector("[data-field=fav]");
  toDoList.appendChild(clone);
}
