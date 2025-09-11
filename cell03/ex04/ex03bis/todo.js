$(document).ready(function () {
  loadTodos();

  $('#new-button').on('click', function () {
    const task = prompt('Enter a new TO DO:');
    if (task && task.trim() !== '') {
      addTodo(task.trim());
    }
  });
});

function addTodo(text) {
  const $newItem = $('<div></div>')
    .addClass('todo-item')
    .text(text)
    .on('click', function () {
      const confirmDelete = confirm('Do you want to delete this TO DO?');
      if (confirmDelete) {
        $(this).remove();
        saveTodos();
      }
    });

  $('#ft_list').append($newItem);
  saveTodos();
}

function saveTodos() {
  const todos = [];
  $('.todo-item').each(function () {
    todos.push($(this).text());
  });

  document.cookie = 'todos=' + encodeURIComponent(JSON.stringify(todos)) + '; path=/';
}

function loadTodos() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = cookies[i].trim().split('=');
    if (name === 'todos') {
      try {
        const todoArray = JSON.parse(decodeURIComponent(value));
        todoArray.forEach(todo => addTodo(todo));
      } catch (e) {
        console.error('Failed to parse todos from cookie:', e);
      }
      break;
    }
  }
}
