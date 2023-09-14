"use strict";
const btn = document.querySelector("#add_button");
const toDoList = document.querySelector("#todo_table");
const doneList = document.querySelector("#done_table");
let taskArray = JSON.parse(localStorage.getItem("array")) || [];
let doneArray = JSON.parse(localStorage.getItem("doneArray")) || [];

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
window.addEventListener("load", displayLocalDone);
//window.addEventListener("load", hideDelete);
editBtn.addEventListener("click", showEdit);
btn.addEventListener("click", addTask);

function showEdit() {
  document.querySelectorAll(".delete").forEach((btn) => {
    btn.classList.toggle("hidden");
    btn.addEventListener("click", delTask);
  });

  if (document.querySelector(".delete") !== null) {
    if (document.querySelector(".delete").classList.contains("hidden")) {
      impText.disabled = false;
      impDate.disabled = false;
      btn.disabled = false;
      editBtn.textContent = "edit list";
    } else {
      impText.disabled = true;
      impDate.disabled = true;
      btn.disabled = true;
      editBtn.textContent = "cancel";
    }
  } else {
    impText.disabled = false;
    impDate.disabled = false;
    btn.disabled = false;
    editBtn.textContent = "edit list";
  }
}

function delTask(evt) {
  const targetID = evt.target.parentElement.id;
  if (evt.target.parentElement.parentElement.id === "todo_table") {
    const targetObj = taskArray.findIndex((taskObj) => taskObj.id === parseInt(targetID));
    taskArray.splice(targetObj, 1);
    localStorage.setItem("array", JSON.stringify(taskArray));
    displayAll();
  } else if (evt.target.parentElement.parentElement.id === "done_table") {
    const targetObj = doneArray.findIndex((taskObj) => taskObj.id === parseInt(targetID));
    doneArray.splice(targetObj, 1);
    localStorage.setItem("doneArray", JSON.stringify(doneArray));
    displayAll();
  }
}

function displayAll() {
  displayLocalTask();
  displayLocalDone();
  showEdit();
}

function displayLocalTask() {
  toDoList.innerHTML = "";
  taskArray = JSON.parse(localStorage.getItem("array"));
  if (taskArray !== null) {
    // console.log(taskArray);
    taskArray.forEach((task) => {
      const clone = document.querySelector("template").content.cloneNode(true);
      const star = clone.querySelector("[data-field=fav]");

      const checkBox = clone.querySelector("input");
      star.addEventListener("click", favClicked);
      checkBox.addEventListener("click", taskDone);

      if (task.fav === true) {
        clone.querySelector("[data-field=fav]").innerHTML = starFull;
      } else {
        clone.querySelector("[data-field=fav]").innerHTML = starEmpty;
      }

      if (task.done === true) {
        clone.querySelector("input").checked = true;
      } else {
        clone.querySelector("input").checked = false;
      }

      function taskDone(evt) {
        if (evt.target.checked === true) {
          task.done = true;
        } else {
          task.done = false;
        }
        console.log(taskArray);

        displayLocalDone(evt);

        const targetID = evt.target.parentElement.parentElement.id;
        const targetObj = taskArray.findIndex((taskObj) => taskObj.id === parseInt(targetID));
        taskArray.splice(targetObj, 1);
        localStorage.setItem("array", JSON.stringify(taskArray));
        displayLocalTask(evt);
      }

      function favClicked() {
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

function displayLocalDone() {
  doneList.innerHTML = "";
  taskArray.map((task) => {
    if (task.done === true) {
      doneArray.push(task);
      localStorage.setItem("doneArray", JSON.stringify(doneArray));
    }
  });
  doneArray = JSON.parse(localStorage.getItem("doneArray"));
  if (doneArray !== null) {
    console.log(doneArray);
    doneArray.forEach((task) => {
      const clone = document.querySelector("template").content.cloneNode(true);
      const star = clone.querySelector("[data-field=fav]");

      const checkBox = clone.querySelector("input");
      star.addEventListener("click", favClicked);
      checkBox.addEventListener("click", taskUnDone);

      if (task.fav === true) {
        clone.querySelector("[data-field=fav]").innerHTML = starFull;
      } else {
        clone.querySelector("[data-field=fav]").innerHTML = starEmpty;
      }

      if (task.done === true) {
        clone.querySelector("input").checked = true;
      } else {
        clone.querySelector("input").checked = false;
      }

      function taskUnDone(evt) {
        const targetID = evt.target.parentElement.parentElement.id;
        const targetObj = doneArray.findIndex((taskObj) => taskObj.id === parseInt(targetID));
        const taskToMove = doneArray.splice(targetObj, 1)[0];
        taskToMove.done = false;
        taskArray.push(taskToMove);

        localStorage.setItem("doneArray", JSON.stringify(doneArray));
        localStorage.setItem("array", JSON.stringify(taskArray));
        displayLocalDone();
        displayLocalTask();
      }

      function favClicked() {
        if (task.fav === true) {
          task.fav = false;
        } else {
          task.fav = true;
        }

        localStorage.setItem("doneArray", JSON.stringify(doneArray));

        displayLocalDone(doneArray);
      }

      clone.querySelector("tr").id = task.id;
      clone.querySelector("[data-field=desc]").textContent = task.desc;
      clone.querySelector("[data-field=date]").textContent = task.date;
      doneList.appendChild(clone);
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
      done: false,
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
  const checkBox = clone.querySelector("input");
  star.addEventListener("click", favClicked);
  checkBox.addEventListener("click", taskDone);

  if (task.fav === true) {
    clone.querySelector("[data-field=fav]").innerHTML = starFull;
  } else {
    clone.querySelector("[data-field=fav]").innerHTML = starEmpty;
  }

  if (task.done === true) {
    clone.querySelector("input").checked = true;
  } else {
    clone.querySelector("input").checked = false;
  }

  function taskDone(evt) {
    if (evt.target.checked === true) {
      task.done = true;
    } else {
      task.done = false;
    }
    console.log(taskArray);
    displayLocalDone(evt);

    const targetID = evt.target.parentElement.parentElement.id;
    const targetObj = taskArray.findIndex((taskObj) => taskObj.id === parseInt(targetID));
    taskArray.splice(targetObj, 1);
    localStorage.setItem("array", JSON.stringify(taskArray));
    displayLocalTask();
  }

  function favClicked() {
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
