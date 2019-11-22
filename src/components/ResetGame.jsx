import React, { Component } from 'react'

const ResetGame = props => {
  return (
    <button className="reset-game" onClick={props.resetClick}>
      Play Again
    </button>
  )
}

export default ResetGame
