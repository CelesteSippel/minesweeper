{
  board.map((col, i) => {
    return (
      <tr key={i}>
        {col.map((row, j) => {
          return (
            <Mines
              key={j}
              display={board[i][j]}
              handleLeftClick={() => leftClick(i, j)}
              handleRightClick={() => rightClick(i, j)}
            />
          )
        })}
      </tr>
    )
  })
}


{board.map(arr => {
  return (
    <tr>
      {arr.map(ar => {
        return <td></td>
      })}
    </tr>
  )
})}
</table>
) }


<div>
            <table>
            {board.map((col, i) => {
              return (
              <tr key={i}>
               {col.map((row, j) => {
               return (
               <Mines
               key={j}
               display={board[i][j]}
               handleLeftClick={() => leftClick(i, j)}
               handleRightClick={() => rightClick(i, j)}
              />
              )
              })}
             </tr>
              )
              })
              }
              
            </div>




            import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Mines from './Mines'
import Difficulty from './Difficulty'
import GameOver from './GameOver'
import ResetGame from './ResetGame'

const BoardGame = () => {
  

  const createGame = async () => {
    const resp = await axios.post(
      'https://minesweeper-api.herokuapp.com/games',
      { difficulty: number }
    )
    console.log(resp.data)
    setId(resp.data.id)
    setBoard(resp.data.board)
    setDifficulty(resp.data.difficulty)
    
  }
  useEffect(() => {
    createGame()
  }, [])
  
  showBoard = () => {
    if (board) {
  }
  const leftClick = async (x, y) => {
    const resp = await axios.post(
      `https://minesweeper-api.herokuapp.com/games/games/${id}/check`,
      {
        row: x,
        col: y
      }
    )
    setBoard(resp.data.board)
    setId(resp.data.id)
    setState(resp.data.state)
    gameOver()
  }

  const rightClick = async (x, y) => {
    const resp = await axios.post(
      `https://minesweeper-api.herokuapp.com/games/games/${gameId}/flag`,
      {
        row: x,
        col: y
      }
    )
    setBoard(resp.data.board)
    setId(resp.data.id)
    setState(resp.data.state)
  }

  const gameOver = async () => {
    if (state === 'lost') {
      setState('You lose!! Try again!')
    } else if ((state = 'won')) {
      setState('Winner!!')
    }
  }
  //  or do I put setStatus("")
  const resetGame = () => {
    createGame()
    setState()
  }
  return (
    <>
      <h1>Minesweeper!</h1>
      <Difficulty
        easyLevel={() => createGame(0)}
        mediumLevel={() => createGame(1)}
        hardLevel={() => createGame(2)}
      />
      <main>
        <section className="play" />
        <GameOver displayResult={state} />
        <ResetGame resetClick={resetGame} />
        <table className="game-board">
          <tbody>
            {board.map((col, i) => {
              return (
                <tr key={i}>
                  {col.map((row, j) => {
                    return (
                      <Mines
                        key={j}
                        display={board[i][j]}
                        handleLeftClick={() => leftClick(i, j)}
                        handleRightClick={() => rightClick(i, j)}
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>
    </>
  )
}

export default BoardGame
