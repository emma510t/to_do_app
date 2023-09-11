"use strict";

const btn = document.querySelector("button");
const toDoList = document.querySelector("#to_do :nth-child(2)");
const task = {
  id: 0,
  desc: "task_text",
  date: "date_text",
  fav: false,
};
const taskArray = [];

btn.addEventListener("click", addTask);

function addTask(evt) {
  evt.preventDefault();
  let inputText = document.getElementById("input_text").value;
  console.log(inputText);

  task.desc = inputText;
  console.log(taskArray);
}
