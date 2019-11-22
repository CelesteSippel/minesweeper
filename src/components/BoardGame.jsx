import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cell from './Cell'
import Difficulty from './Difficulty'
import GameOver from './GameOver'
import ResetGame from './ResetGame'

const BoardGame = () => {
  const [id, setId] = useState('')
  const [board, setBoard] = useState([])
  const [difficulty, setDifficulty] = useState('')
  const [state, setState] = useState('')
  const [status, setStatus] = useState('')

  const createGame = async () => {
    const resp = await axios.post(
      'https://minesweeper-api.herokuapp.com/games',
      { difficulty: 0 }
    )
    console.log(resp.data)
    setId(resp.data.id)
    setBoard(resp.data.board)
    setDifficulty(resp.data.difficulty)
  }
  useEffect(() => {
    createGame()
  }, [])

  const showBoard = () => {
    if (board) {
    }
  }
  const leftClick = async (x, y) => {
    const resp = await axios.post(
      'https://minesweeper-api.herokuapp.com/games/games/{id}/check',
      {
        row: x,
        col: y
      }
    )
    console.log(resp.data)
    setBoard(resp.data.board)
    setId(resp.data.id)

    setState(resp.data.state)
    gameOver()
  }

  useEffect(() => {
    leftClick()
  }, [])

  //I think I need to put gameOver???

  const rightClick = async (x, y) => {
    const resp = await axios.post(
      `https://minesweeper-api.herokuapp.com/games/games/${this.state.id}/flag`,
      {
        row: x,
        col: y
      }
    )
    console.log(resp.data)
    setBoard(resp.data.board)
    setId(resp.data.id)

    setState(resp.data.state)
  }
  useEffect(() => {
    rightClick()
  }, [])

  const gameOver = async () => {
    if (state === 'lost') {
      setState({
        status: 'You lose!! Try again!'
      })
    } else if ((state = 'won')) {
      setState({
        status: 'Winner!!'
      })
    }
  }
  //  or do I put setStatus("")
  const resetGame = () => {
    createGame()
    setState({
      status: ''
    })
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
        <GameOver displayResult={status} />
        <ResetGame resetClick={resetGame} />
        <table className="game-board">
          <tbody>
            {board.map((col, i) => {
              return (
                <tr key={i}>
                  {col.map((row, j) => {
                    return (
                      <Cell
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
