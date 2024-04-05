export function readTodosFromLocalStorage() {
  const todosFromStorage = localStorage.getItem("todos");
  if (todosFromStorage !== null) {
    return JSON.parse(todosFromStorage);
  }
  return [];
}

export function saveTodosToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function isDuplicate(todos, newTodoText) {
  const normalizedNewTodoText = newTodoText.toLowerCase();
  return todos.some(
    (todo) => todo.todo.toLowerCase() === normalizedNewTodoText
  );
}
