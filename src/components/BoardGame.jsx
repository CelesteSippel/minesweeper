import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Mines from './Mines'
import GameOver from './GameOver'
import ResetGame from './ResetGame'
import Difficulty from './Difficulty'

const BoardGame = () => {
  const [id, setId] = useState('')
  const [board, setBoard] = useState([])
  const [difficulty, setDifficulty] = useState('')
  const [state, setState] = useState('')
  const [status, setStatus] = useState('')

  const createGame = async number => {
    const resp = await Axios.post(
      'https://minesweeper-api.herokuapp.com/games',
      {
        difficulty: number
      }
    )
    console.log(resp)
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
    const resp = await Axios.post(
      `https://minesweeper-api.herokuapp.com/games/${id}/check`,
      {
        row: x,
        col: y
      }
    )
    console.log(resp)
    setBoard(resp.data.board)
    setId(resp.data.id)
    setState(resp.data.state)
    gameOver()
  }

  const rightClick = async (x, y) => {
    const resp = await Axios.post(
      `https://minesweeper-api.herokuapp.com/games/${id}/flag`,
      {
        row: x,
        col: y
      }
    )
    setBoard(resp.data.board)
    setId(resp.data.id)
    setState(resp.data.state)
    console.log(resp)
  }

  const gameOver = async () => {
    if (state === 'lost') {
      setState({
        status: 'Oh no, you lose!! Try again!'
      })
    } else if (state === 'won') {
      setState({
        status: 'Yay! You won!'
      })
    }
  }

  const resetGame = () => {
    createGame()
    setState({
      status: ''
    })
  }

  return (
    <>
      <h1 className="box-title">Minesweeper</h1>
      <Difficulty
        easyLevel={() => createGame(0)}
        mediumLevel={() => createGame(1)}
        hardLevel={() => createGame(2)}
      />
      <main>
        <section className="play" />
        <GameOver displayResult={setStatus} />
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
