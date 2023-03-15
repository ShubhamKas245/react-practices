
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

export default class app extends Component {
  state={
    todoText:"",
    todoList:[],
  }
  todoTextRef=createRef();

  changeText=(e)=>{
    this.setState({todoText:e.target.value})
    // console.log(todoText.value)
  }

  addTodo=(e)=>{e.preventDefault(); 

    this.setState(({todoList})=>({todoList:[...todoList,{id:new Date().valueOf(), text:this.todoTextRef.current.value}],}),
    ()=>{this.todoTextRef.current.value=''})}
  render() {
    const {todoList}=this.state;
    return (
      <div className='todo'>
        <h1 className='todo__title'>Todo App</h1>
        <form className='todo__form' onSubmit={this.addTodo}>
          <div>
            <label htmlFor='todoText' className='sr-only'>Todo</label>
            <input ref={this.todoTextRef} type="text" id="todoText" className='rounded-l-md'
            //  value={this.state.todoText} onChange={this.changeText} 
            />
          </div>
          <button type="submit" className='btn rounded-r-md'> Add Todo</button>
        </form >
        <div className='todo__list'>
          {todoList.map((x)=> <div className='todo__list-item' key={x.id}>
            <input type="checkbox" />
            <p className='px-4 flex-1'>{x.text}</p>
            <button type="button" className='btn rounded-md'>Delete</button>
          </div>)}
         
        </div>
        <div className='todo__filter'>
          <button type='button' className='btn btn--active flex-1'>All</button>
          <button type='button' className='btn flex-1'>Pending</button>
          <button type='button' className='btn flex-1'>Completed</button>
        </div>
      </div>
    )
  }
}
