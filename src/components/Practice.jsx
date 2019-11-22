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
