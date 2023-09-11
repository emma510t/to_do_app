"use strict";

const btn = document.querySelector("button");
const toDoList = document.querySelector("#to_do :nth-child(2)");
const taskArray = [];
let taskID = 1;

btn.addEventListener("click", addTask);

function addTask(evt) {
  if (document.querySelector("#input_text").value !== "") {
    evt.preventDefault();
    const inputText = document.getElementById("input_text");
    const inputDate = document.getElementById("input_date");
    console.log(inputText);

    const task = {
      id: taskID++,
      desc: inputText.value,
      date: inputDate.value,
      fav: false,
    };

    taskArray.push(task);

    console.log(taskArray);

    /// clear input

    inputText.value = "";
    inputDate.value = "";

    displayTask(task);
  }
}

function displayTask(task) {
  const clone = document.querySelector("template").content.cloneNode(true);
  clone.querySelector("[data-field=desc]").textContent = task.desc;
  clone.querySelector("[data-field=date]").textContent = task.date;
  //clone.querySelector("[data-field=fav]");
  toDoList.appendChild(clone);
}

/* function displayTask(array) {
  array.forEach((task) => {
    const clone = document.querySelector("template").content.cloneNode(true);
    clone.querySelector("[data-field=desc]").textContent = task.desc;
    clone.querySelector("[data-field=date]").textContent = task.date;
    //clone.querySelector("[data-field=fav]");
    toDoList.appendChild(clone);
  });
} */
