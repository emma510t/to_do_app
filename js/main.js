"use strict";
const btn = document.querySelector("#add_button");
const toDoList = document.querySelector("#todo_table");
let taskArray = [];
const editBtn = document.querySelector("#edit_button");
const impText = document.querySelector("#input_text");
const impDate = document.querySelector("#input_date");

const starFull = `<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z"
          fill="#FFD600"
          stroke="#FFD600"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>`;
const starEmpty = `<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z"
          fill="#FFF"
          stroke="#FFD600"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>`;

window.addEventListener("load", displayLocalTask);
editBtn.addEventListener("click", showEdit);
btn.addEventListener("click", addTask);

function showEdit() {
  document.querySelectorAll(".delete").forEach((btn) => {
    btn.classList.toggle("hidden");
    btn.addEventListener("click", delTask);
  });
  if (impText.disabled === false) {
    impText.disabled = true;
    impDate.disabled = true;
    btn.disabled = true;
  } else {
    impText.disabled = false;
    impDate.disabled = false;
    btn.disabled = false;
  }
}

function delTask(evt) {
  const targetID = evt.target.parentElement.id;
  const targetObj = taskArray.findIndex((taskObj) => taskObj.id === parseInt(targetID));
  taskArray.splice(targetObj, 1);
  localStorage.setItem("array", JSON.stringify(taskArray));
  displayLocalTask();
}

function displayLocalTask() {
  toDoList.innerHTML = "";
  taskArray = JSON.parse(localStorage.getItem("array"));
  if (taskArray !== null) {
    console.log(taskArray);
    taskArray.forEach((task) => {
      const clone = document.querySelector("template").content.cloneNode(true);
      const star = clone.querySelector("[data-field=fav]");
      star.addEventListener("click", favClicked);

      if (task.fav === true) {
        clone.querySelector("[data-field=fav]").innerHTML = starFull;
      } else {
        clone.querySelector("[data-field=fav]").innerHTML = starEmpty;
      }

      function favClicked() {
        console.log("j");
        if (task.fav === true) {
          task.fav = false;
        } else {
          task.fav = true;
        }

        localStorage.setItem("array", JSON.stringify(taskArray));

        displayLocalTask(taskArray);
      }

      clone.querySelector("tr").id = task.id;
      clone.querySelector("[data-field=desc]").textContent = task.desc;
      clone.querySelector("[data-field=date]").textContent = task.date;
      toDoList.appendChild(clone);
    });
  }
}

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
  const star = clone.querySelector("[data-field=fav]");
  star.addEventListener("click", favClicked);

  if (task.fav === true) {
    clone.querySelector("[data-field=fav]").innerHTML = starFull;
  } else {
    clone.querySelector("[data-field=fav]").innerHTML = starEmpty;
  }

  function favClicked() {
    console.log("fav");
    if (task.fav === true) {
      task.fav = false;
    } else {
      task.fav = true;
    }

    localStorage.setItem("array", JSON.stringify(taskArray));
    displayLocalTask(taskArray);
  }

  clone.querySelector("tr").id = task.id;
  clone.querySelector("[data-field=desc]").textContent = task.desc;
  clone.querySelector("[data-field=date]").textContent = task.date;
  toDoList.appendChild(clone);
}
