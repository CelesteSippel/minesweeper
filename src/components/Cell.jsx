import React from 'react'

const Cell = props => {
  return (
    <div>
      <td
        onClick={props.handleLeftClick}
        onContextMenu={e => {
          e.preventDefault()
          props.handleRightClick()
        }}
      >
        {props.display}
      </td>
    </div>
  )
}

export default Cell
