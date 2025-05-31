interface Todo {
  id: number;
  text: string;
  done: boolean;
}

let todos: Todo[] = loadTodos();

const form = document.getElementById("todo-form") as HTMLFormElement;
const input = document.getElementById("todo-input") as HTMLInputElement;
const list = document.getElementById("todo-list") as HTMLUListElement;

renderTodos();

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const text = input.value.trim();

  if (text !== "") {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      done: false,
    };

    todos.push(newTodo);
    saveTodos();
    input.value = "";
    renderTodos();
  }
});

function renderTodos(): void {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");

    li.textContent = todo.text;

    if (todo.done) {
      li.style.textDecoration = "line-through";
    }

    const toggleBtn = document.createElement("button");

    toggleBtn.textContent = todo.done ? "Undo" : "Done";
    toggleBtn.addEventListener("click", () => {
      todo.done = !todo.done;
      saveTodos();
      renderTodos();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    li.append(" ", toggleBtn, deleteBtn);
    list.appendChild(li);
  });
}

function saveTodos(): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos(): Todo[] {
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];
}
