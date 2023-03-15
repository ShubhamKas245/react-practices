
// /* eslint-disable no-unused-vars */
// export const a = 1;
// export const b = 2;

// const x = 1;

// class Animal {
//   constructor(type) {
//     this.type = type;
//   }

//   displayType() {
//     console.log(this.type);
//   }
// }

// // Per file only 1 export default possible
// export default Animal;

// // Bundling
// // Minification
// // uglification

import React, { Component, createRef } from 'react'
import './style.scss';
import './todo.scss'
import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default class app extends Component {
  state={
    todoList:[],
    filter:'All',
  }
  todoTextRef=createRef();

  changeText=(e)=>{
    this.setState({todoText:e.target.value})
    // console.log(todoText.value)
  }

  addTodo=(e)=>{e.preventDefault(); 

    this.setState(({todoList})=>({todoList:[...todoList,{id:new Date().valueOf(), 
      text:this.todoTextRef.current.value,isDone:false}],}),
    ()=>{this.todoTextRef.current.value=''})
  }

  updateTodo=(item)=>{
   console.log(item);
   this.setState(({todoList})=>{
    const index = todoList.findIndex((x)=>x.id===item.id);
    return {
      todoList:[
        ...todoList.slice(0,index),
        {...item,isDone:!item.isDone},
        ...todoList.slice(index+1),
      ],
    }
   })
  }

  deleteTodo=(item)=>{
    const isConfirmed=confirm(`Are u want to delete this item`);
    if(isConfirmed){
    this.setState(({todoList})=>{
     const index = todoList.findIndex((x)=>x.id===item.id);
     return {
       todoList:[
         ...todoList.slice(0,index),
         ...todoList.slice(index+1),
       ],
     }
    })}
   }

   filterTodo=(filter)=>{
     this.setState({filter})
   }

  render() {
    const {todoList,filter}=this.state;
    return (
      <div className='todo'>
        <h1 className='todo__title'>Todo App</h1>
        <TodoForm addTodo={this.addTodo} ref={this.todoTextRef} />
        <div className='todo__list'>
          {todoList.length > 0 && (
        <TodoList todoList={todoList} filter={filter} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
        )}
        </div>
        
         <TodoFilter filter={filter} filterTodo={this.filterTodo}/>
      </div>
    )
  }
}
