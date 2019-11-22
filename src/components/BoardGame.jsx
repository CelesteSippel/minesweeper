import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Mines from './Mines'
import Difficulty from './Difficulty'
import GameOver from './GameOver'
import ResetGame from './ResetGame'

const BoardGame = () => {
  const [id, setId] = useState('')
  const [board, setBoard] = useState([])
  const [difficulty, setDifficulty] = useState('')
  const [state, setState] = useState('new')
  const [mines, setMines] = useState(10)
  // const [status, setStatus] = useState('')

  const createGame = async () => {
    const resp = await axios.post(
      'https://minesweeper-api.herokuapp.com/games',
      { difficulty: 0 }
    )
    console.log(resp.data)
    setId(resp.data.id)
    setBoard(resp.data.board)
    setDifficulty(resp.data.difficulty)
    setMines(resp.data.mines)
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
      `https://minesweeper-api.herokuapp.com/games/games/${state.id}/check`,
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

  // I think I need to put gameOver???

  const rightClick = async (x, y) => {
    const resp = await axios.post(
      `https://minesweeper-api.herokuapp.com/games/games/${state.id}/flag`,
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
      setState('You lose!! Try again!')
    } else if ((state = 'won')) {
      setState('Winner!!')
    }
  }
  //  or do I put setStatus("")
  const resetGame = () => {
    createGame()
    setState('')
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
            <table>
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
          </tbody>
        </table>
      </main>
    </>
  )
}

export default BoardGame
