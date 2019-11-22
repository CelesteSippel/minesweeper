import React, { Component } from 'react'

const GameOver = props => {
  return (
    <>
      <h2 className="game-over">{props.displayResult}</h2>
    </>
  )
}

export default GameOver
