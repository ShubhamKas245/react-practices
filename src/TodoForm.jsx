import React,{forwardRef, memo} from 'react'
import PropTypes from 'prop-types';

const TodoForm=forwardRef(({addTodo},ref)=> {
    
    console.log("Todo form render")


  return (
    <form className='todo__form' onSubmit={addTodo}>
    <div>
      <label htmlFor='todoText' className='sr-only'>Todo</label>
      <input ref={ref} type="text" id="todoText" className='rounded-l-md'
      //  value={this.state.todoText} onChange={this.changeText} 
      />
    </div>
    <button type="submit" className='btn rounded-r-md'> Add Todo</button>
  </form >
  )
})

TodoForm.prototypes={
    addTodo:PropTypes.func.isRequired,
}

export default memo(TodoForm);