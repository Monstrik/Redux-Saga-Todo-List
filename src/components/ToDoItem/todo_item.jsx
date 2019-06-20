import React from 'react';

export default ({todo, deleteTodo}) => {
    console.log(todo)
  return (
    <li className="todo-item">
      <span>
        {todo.text}
      </span>
      <span>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </span>
    </li>
  )
}
