
export function fetchTodosByuser(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/todos/" + id);
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function saveTodo(newTodo) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/todos/",
      {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: { 'content-type': 'application/json' }
      });

    const data = await response.json();
    resolve({ data })
  }
  );
}
export function editTodo({ Todo, id }) {
  return new Promise(async (resolve) => {
    console.log("edit : ", Todo);
    const response = await fetch("http://localhost:8080/todos/" + id,
      {
        method: "PATCH",
        body: JSON.stringify(Todo),
        headers: { 'content-type': 'application/json' }
      });
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function deleteTodo(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/todos/' + id,
      {
        method: "DELETE",
        headers: { 'content-type': 'application/json' }
      });
    const data = await response.json();
    resolve({ data })
  }
  );
}


