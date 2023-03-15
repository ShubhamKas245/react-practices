import React, { memo } from 'react'

function Child() {
  return (
    <div>Child 1</div>
  )
}

export default memo(Child,(prevProps,nextProps)=>{
    return false;
});

