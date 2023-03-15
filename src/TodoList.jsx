import React from 'react'
import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem';

function TodoList({todoList,filter,updateTodo,deleteTodo}) {

    console.log("Todo List render")


  return (
    <>
    {todoList.map((x)=>{ 
       if(filter==='All' || (filter==='Pending' && x.isDone ===false) || (filter==='Completed' && x.isDone ===true))
       {  
        return (
        <TodoListItem key={x.id} item={x} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        );
       }
    return null;
    })}
     
    </>
  );
}

TodoList.prototype={
    todoList: PropTypes.arrayOf(PropTypes.exact({
      id:PropTypes.number.isRequired,
      text:PropTypes.string.isRequired,
      isDone:PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    filter:PropTypes.oneOf(['All','Pending','Completed']).isRequired,
    updateTodo:PropTypes.func.isRequired,
    deleteTodo:PropTypes.func.isRequired,
}

export default TodoList