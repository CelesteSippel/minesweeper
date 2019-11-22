import React from 'react'

const Mines = props => {
  return (
    <>
      <td
        onClick={props.handleLeftClick}
        onContextMenu={e => {
          e.preventDefault()
          props.handleRightClick()
        }}
      >
        {props.display}
      </td>
    </>
  )
}

export default Mines
