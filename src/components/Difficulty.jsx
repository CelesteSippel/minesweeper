import React from 'react'

const Difficulty = props => {
  return (
    <>
      <section className="which-difficulty">
        <h2>Choose Difficulty</h2>
        <button className="button" onClick={props.easyLevel}>
          Easy (10 Mines){' '}
        </button>
        <button className="button" onClick={props.mediumLevel}>
          Intermediate (40 Mines)
        </button>
        <button className="button" onClick={props.hardLevel}>
          Expert (99 Mines)
        </button>
        {props.showBoard}
      </section>
    </>
  )
}

export default Difficulty
