import {
  readTodosFromLocalStorage,
  saveTodosToLocalStorage,
  isDuplicate,
} from "./lib.js";

document.addEventListener("DOMContentLoaded", function () {
  let todos = readTodosFromLocalStorage();

  const deleteTodosButton = document.querySelector("#delete-todos");
  const addTodoBtn = document.querySelector("#add-todo");
  const todoListEl = document.querySelector("#todo-list");

  addTodoBtn.addEventListener("click", function () {
    addNewTodo();
  });

  function addNewTodo() {
    const newTodoEl = document.querySelector("#new-todo");
    const newTodoText = newTodoEl.value.trim();

    if (newTodoText.length === 0 || isDuplicate(todos, newTodoText)) {
      return;
    }

    const newTodo = {
      todo: newTodoText,
      done: false,
    };
    todos.push(newTodo);

    renderTodos();
    saveTodosToLocalStorage(todos);

    newTodoEl.value = "";
  }

  function renderTodos() {
    todoListEl.innerHTML = "";

    todos.forEach(function (currentTodo) {
      const newTodoLiEl = document.createElement("li");

      const todoCheckboxEl = document.createElement("input");
      todoCheckboxEl.setAttribute("type", "checkbox");
      todoCheckboxEl.checked = currentTodo.done;
      newTodoLiEl.appendChild(todoCheckboxEl);

      const textNode = document.createTextNode(currentTodo.todo);
      newTodoLiEl.append(textNode);

      if (currentTodo.done === true) {
        newTodoLiEl.classList.add("done");
      }

      newTodoLiEl.todo = currentTodo;

      todoListEl.appendChild(newTodoLiEl);
    });

    filterTodos();
  }

  todoListEl.addEventListener("change", function (event) {
    toggleTodoState(event);
  });

  function toggleTodoState(event) {
    const checkbox = event.target;
    if (checkbox.checked === true) {
      checkbox.parentElement.classList.add("done");
      checkbox.parentElement.todo.done = true;
    } else {
      checkbox.parentElement.classList.remove("done");
      checkbox.parentElement.todo.done = false;
    }

    saveTodosToLocalStorage(todos);
  }

  const todoFilterEl = document.querySelector("#todo-filter");
  todoFilterEl.addEventListener("change", function () {
    filterTodos();
  });

  function filterTodos() {
    const filterValue = getFilterValue();

    todos.forEach((todo) => {
      const currentTodoEl = todoListEl.querySelector(`[data-id="${todo.id}"]`);
      if (!currentTodoEl) return;

      if (
        filterValue === "all" ||
        (filterValue === "open" && !todo.done) ||
        (filterValue === "done" && todo.done)
      ) {
        currentTodoEl.style.display = "block";
      } else {
        currentTodoEl.style.display = "none";
      }
    });
  }

  function getFilterValue() {
    return document.querySelector('input[name="todo-filter"]:checked').value;
  }

  deleteTodosButton.addEventListener("click", function () {
    deleteDoneTodos();
  });

  function deleteDoneTodos() {
    todos = todos.filter((todo) => !todo.done);
    saveTodosToLocalStorage(todos);
    renderTodos();
  }

  renderTodos();
});
