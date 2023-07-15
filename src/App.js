import './App.css';
import TodoItem from './components/ToDoItem/TodoItem'
import  TodoCounter  from './components/ToDoCounter/TodoCounter';
import  TodoList  from './components/ToDoList/TodoList';
import  CreateToDoItem  from './components/CreateToDoItem/CreateToDoItem';
import  TodoSearch  from './components/ToDoSearch/TodoSearch';
import { ToDoManager } from './models/toDo';
import React from 'react';

// const todoManager = new ToDoManager();

function App() {
  let tasksItems = localStorage.getItem('tasks');
  let parsedTasks;
  if (!tasksItems){
    localStorage.setItem('tasks', JSON.stringify([]));
    parsedTasks = [];
  }
  else{
    parsedTasks = JSON.parse(tasksItems);
  
  }
  const [searchValue, setSearchValue] = React.useState('');
  const [newTaskValue, setTaskValue] = React.useState('')
  const [tasks, setTasks] = React.useState(parsedTasks);
  const completedTodos = tasks.filter(task => task.completed).length;
  const totalTodos = tasks.length;
  const searchedTodos = tasks.filter(task => task.text.toLowerCase().includes(searchValue.toLowerCase()));
  const saveTasks = (items) => {
    localStorage.setItem('tasks', JSON.stringify(items));
    setTasks(items);
  }
  const completeTodo = (text) =>{
    const newTodos = [...tasks];
    const todoIndex = newTodos.findIndex(task => task.text === text);
    newTodos[todoIndex].completed = true;
    saveTasks(newTodos)
  }
  const allTodosCompleted = () => {
    if (tasks.length === 0){
      return false
    }else{
      return tasks.every(task => task.completed);
    } 
    
  };
  const deleteTask = (text) =>{
    const newTodos = [...tasks];
    const todoIndex = newTodos.findIndex(task => task.text === text);
    newTodos.splice(todoIndex, 1);
    saveTasks(newTodos);
  
  }

  const createTask = (text) =>{
    const newTodos = [...tasks];
    if (text !== ""){
      newTodos.push({
        text,
        completed: false
      });
      saveTasks(newTodos);
    }
    setTaskValue('');

  }
  return (
    <>
      <h1>{allTodosCompleted() ? 'Congrats you have completed all your tasks!!!': 'React ToDo App'}</h1>
      {allTodosCompleted() ? '': <TodoCounter total={totalTodos} completed={completedTodos}/>}
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <TodoList>
        {searchedTodos.map(task => (
          <TodoItem onComplete={() => completeTodo(task.text)} 
          onDelete = { () => deleteTask(task.text)}
          key={task.text} text={task.text} completed={task.completed}/>
          ))}
      </TodoList>
      <div className='controls'>
        <CreateToDoItem
        newTaskValue={newTaskValue}
        setTaskValue={setTaskValue}
        onCreate={() => createTask(newTaskValue)}
        />
      </div>
      
    </>
  );
}



export default App;

