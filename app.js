const addTodo = document.querySelector(".add");
const list = document.querySelector(".todos");
const counter = document.getElementById("counter");
const filters = document.querySelectorAll(".filters");
const listTodo = document.querySelectorAll(".list-todo");
const clearCompletedTodo = document.getElementById("clear");
const iconSun = document.getElementById("icon-sun");
const iconMoon = document.getElementById("icon-moon");
const body = document.querySelector("body");
const header = document.querySelector("header");
const options = document.querySelectorAll(".options");

let counterItem = 0;

//templates
const generateTemplate = (todo) => {
  const html = `
  <li class="list-todo"><i class="far fa-1x fa-circle circle "></i>${todo}<i class="fas cross fa-times"></i></li> `;

  list.innerHTML += html;
  counterItem++;
  counter.innerText = `${counterItem} Items left`;
};
//add todo
addTodo.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addTodo.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    if (addTodo.add.style.backgroundColor == "white") {
      Array.from(list.children).forEach((child) => {
        child.classList.add("daylist-todo");
      });
    }
    addTodo.reset();
  }
});

//delete todo
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("cross")) {
    e.target.parentElement.remove();
    if (counterItem != 0) {
      counterItem--;
      counter.innerText = `${counterItem} Items left`;
    }
  }
});
//to complete todo
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    e.target.parentElement.classList.toggle("completed");
    if (e.target.parentElement.classList.contains("completed")) {
      if (counterItem != 0) {
        counterItem--;
        counter.innerText = `${counterItem} Items left`;
      }
    } else {
      counterItem++;
      counter.innerText = `${counterItem} Items left`;
    }
  }
});

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    console.log(e.target.innerText);
    switch (e.target.innerText) {
      case "Active":
        e.preventDefault();

        Array.from(list.children).forEach((child) => {
          if (child.classList.contains("completed")) {
            child.style.display = "none";
          } else {
            child.style.display = "flex";
          }
        });
        break;
      case "Completed":
        e.preventDefault();

        Array.from(list.children).forEach((child) => {
          if (!child.classList.contains("completed")) {
            child.style.display = "none";
          } else {
            child.style.display = "flex";
          }
        });
        break;
      case "All":
        e.preventDefault();

        Array.from(list.children).forEach((child) => {
          child.style.display = "flex";
        });
        break;
    }
  });
});

clear.addEventListener("click", (e) => {
  e.preventDefault();
  Array.from(list.children).forEach((child) => {
    if (child.classList.contains("completed")) {
      child.remove();
    }
  });
});

//to change the theme
iconSun.addEventListener("click", (e) => {
  e.preventDefault();
  Array.from(list.children).forEach((child) => {
    if (child.classList.contains("list-todo")) {
      child.classList.remove("list-todo");
      child.classList.add("daylist-todo");
    }
  });
  if (iconMoon.id == "icon-moon") {
    body.style.backgroundColor = "white";
    header.style.backgroundImage = "url('images/bg-desktop-light.jpg')";
    addTodo.add.style.backgroundColor = "white";
    addTodo.add.style.color = "black";
    iconSun.style.display = "none";
    iconMoon.style.display = "block";
    options.forEach((option) => {
      option.classList.add("dayOptions");
    });
  }
});

iconMoon.addEventListener("click", (e) => {
  e.preventDefault();
  Array.from(list.children).forEach((child) => {
    if (child.classList.contains("daylist-todo")) {
      child.classList.add("list-todo");
      child.classList.remove("daylist-todo");
    }
  });
  if (iconSun.id == "icon-sun") {
    body.style.backgroundColor = "hsl(235, 21%, 11%)";
    header.style.backgroundImage = "url('images/bg-desktop-dark.jpg')";
    iconSun.style.display = "block";
    iconMoon.style.display = "none";
    addTodo.add.style.backgroundColor = "hsl(235, 21%, 11%)";
    addTodo.add.style.color = "white";
    options.forEach((option) => {
      option.classList.remove("dayOptions");
    });
  }
});
