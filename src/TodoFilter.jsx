import React, { memo } from 'react'
import PropTypes from 'prop-types';

function TodoFilter({filterTodo,filter}) {
    console.log("Todo filter render")
  return (
    <div className='todo__filter'>
          <button type='button' className={`btn ${filter==="All" ? 'btn--active' : ''} flex-1`} onClick={()=>filterTodo('All')}>All</button>
          <button type='button' className={`btn ${filter==="Pending" ? 'btn--active' : ''} flex-1`} onClick={()=>filterTodo('Pending')}>Pending</button>
          <button type='button' className={`btn ${filter=="Completed" ? 'btn--active' : ''} flex-1`} onClick={()=>filterTodo('Completed')}>Completed</button>
        </div>
  )
}

TodoFilter.propTypes={
    filter:PropTypes.oneOf(['All','Pending','Completed']).isRequired,
    filterTodo:PropTypes.func.isRequired,
}

export default memo(TodoFilter)