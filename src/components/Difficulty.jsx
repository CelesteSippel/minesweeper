import React from 'react'

const Difficulty = props => {
  return (
    <>
      <section className="what-difficulty">
        <h2>Choose Difficulty</h2>
        <button className="button" onClick={props.easyLevel}>
          Easy{' '}
        </button>
        <button className="button" onClick={props.mediumLevel}>
          Intermediate
        </button>
        <button className="button" onClick={props.hardLevel}>
          Expert
        </button>
        {props.showBoard}
      </section>
    </>
  )
}

export default Difficulty
