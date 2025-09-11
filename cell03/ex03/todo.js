window.onload = function () {
  loadTodos();

  document.getElementById('new-button').onclick = function () {
    const task = prompt('Enter a new TO DO:');
    if (task && task.trim() !== '') {
      addTodo(task.trim());
    }
  };
};

function addTodo(text) {
  const ftList = document.getElementById('ft_list');
  const newItem = document.createElement('div');
  newItem.className = 'todo-item';
  newItem.textContent = text;

  newItem.onclick = function () {
    const confirmDelete = confirm('Do you want to delete this TO DO?');
    if (confirmDelete) {
      ftList.removeChild(newItem);
      saveTodos();
    }
  };

  ftList.appendChild(newItem);
  saveTodos();
}

function saveTodos() {
  const todos = [];
  const items = document.querySelectorAll('.todo-item');
  items.forEach(item => {
    todos.push(item.textContent);
  });

  document.cookie = 'todos=' + encodeURIComponent(JSON.stringify(todos)) + '; path=/';
}

function loadTodos() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let [name, value] = cookies[i].trim().split('=');
    if (name === 'todos') {
      const todoArray = JSON.parse(decodeURIComponent(value));
      todoArray.forEach(todo => addTodo(todo));
      break;
    }
  }
}
