import { useState } from "react";
import "./todo.css";

const isComplete = (status) => {
  return status === 1;
}

const NEW_TODO_ITEM = {
  title: '',
  status: ''
};

const INITIAL_TODO_LIST = [
  {
    title: 'task 1',
    status: 0
  },
  {
    title: 'task 2',
    status: 1
  },
  {
    title: 'task 3',
    status: 0
  },
];

function Todo() {
  let [newItem, setNewItem] = useState(NEW_TODO_ITEM);
  let [todos, setTodos] = useState(INITIAL_TODO_LIST);

  function isTaskCompleted(item){
    return isComplete(item.status)
  }

  function onChangeNewItem(event){
    setNewItem({
      title: event.target.value,
      status: ''
    });
  }

  function onSubmit(e){
      e.preventDefault();
      e.stopPropagation();
      addToTodoList(newItem);
  }

  function clearItemFromNewTodo(){
      setNewItem({
        title: '',
        status: ''
      })
  }

  function addToTodoList(item){
    setTodos([...todos, item]);
    clearItemFromNewTodo();
  }

  function onChangeTaskStatus(event, item){
    console.log(event.target.checked, item);
    item.status = event.target.checked ? 1 : 0;
    const tempTodos = todos.map(task => {
      if(task.title === item.title){
        return ({
          ...item,
          status: event.target.checked ? 1 : 0
        })
      } else {
        return task;
      };
    });
    setTodos(tempTodos);
  }


  return <main>
      <h1 className="app-header">
          TODO App
      </h1>
      <form onSubmit={onSubmit}>
          <input id="newTodo" value={newItem.title}
            onChange={onChangeNewItem}
            placeholder="Todo item title"
            className="todo__control"
          />
          <input type="submit" value="Add" className="todo__button-primary"/>

          <ul id="todoList">
            { todos.map((item, index) => {
              return <li key={index}>
                <input type="checkbox" id={item.title + index}
                  onClick={e => onChangeTaskStatus(e, item)}
                  checked={item.status === 1}
                />
                <label htmlFor={item.title + index}
                  className={isTaskCompleted(item) ? 'complete' : ''}>
                  { item.title }
                </label>
              </li>
            }) }
          </ul>
      </form> 
  </main>;
}

export default Todo;
