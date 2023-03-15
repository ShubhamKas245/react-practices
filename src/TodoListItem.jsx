import React, { memo } from 'react'
import PropTypes from 'prop-types'

function TodoListItem({item, updateTodo, deleteTodo}) {
    console.log("TodoList Item Render")
    return (
        <div className='todo__list-item' key={item.id}>
            <input type="checkbox" checked={item.isDone} onChange={()=>updateTodo(item)} />
            <p className={`px-4 flex-1 ${item.isDone && 'line-through'}`}>{item.text}</p>
            <button type="button" className='btn rounded-md' onClick={()=>deleteTodo(item)}>Delete</button>
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
}

export default memo(TodoListItem);