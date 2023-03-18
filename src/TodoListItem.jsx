import React, { memo } from 'react'
import PropTypes from 'prop-types'

function TodoListItem({item, updateTodo, deleteTodo,updateTodoState,deleteTodoState}) {
    console.log("TodoList Item Render")
    return (
        <div className='todo__list-item' key={item.id}>
            <input type="checkbox" disabled={updateTodoState?.status==='REQUEST'} className='disabled:text-slate-400' checked={item.isDone} onChange={()=>updateTodo(item)} />
            <p className={`px-4 flex-1 ${item.isDone && 'line-through'}`}>{item.text}</p>
            <button type="button" disabled={deleteTodoState?.status==='REQUEST'} className='btn rounded-md disabled:bg-slate-500 disabled:cursor-wait' onClick={()=>deleteTodo(item)}>Delete</button>
          </div>
    )
}

TodoListItem.propTypes={
    item:PropTypes.exact({
        id:PropTypes.number.isRequired,
        text:PropTypes.string.isRequired,
        isDone:PropTypes.bool.isRequired,
    }).isRequired,
    updateTodo:PropTypes.func.isRequired,
    deleteTodo:PropTypes.func.isRequired,
    updateTodoState:PropTypes.arrayOf(PropTypes.shape({
        type:PropTypes.oneOf(['UPADTE_TODO']).isRequired,
        status:PropTypes.oneOf(['REQUEST','ERROR'])
      })).isRequired,
      deleteTodoState:PropTypes.arrayOf(PropTypes.shape({
        type:PropTypes.oneOf(['UPADTE_TODO']).isRequired,
        status:PropTypes.oneOf(['REQUEST','ERROR'])
      })).isRequired,
}
TodoListItem.defaultProps={
    updateTodoState:undefined,
    deleteTodoState:undefined
}
export default memo(TodoListItem);