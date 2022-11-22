import { useState } from "react";
import "./App.css";

interface TableCell {
  row: number;
  col: number;
}

const App = () => {
  const [grid, setGrid] = useState([
    [0, 3, 5, 1],
    [1, 2, 2, 4],
    [4, 3, 5, 0],
  ]);
  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  );

  const [previousClick, setPreviousClick] = useState<TableCell | undefined>();

  const handleCardClick = (rowIndex: number, colIndex: number) => {
    if (revealedGrid[rowIndex][colIndex]) return;
    const newRevealedGrid = [...revealedGrid];
    const clickedNumber = grid[rowIndex][colIndex];
    newRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid(newRevealedGrid);

    if (previousClick) {
      const previousClickNumber = grid[previousClick.row][previousClick.col];
      //second click of 2
      if (previousClickNumber !== clickedNumber) {
        setTimeout(() => {
          // debugger;
          newRevealedGrid[rowIndex][colIndex] = false;
          newRevealedGrid[previousClick.row][previousClick.col] = false;
          setRevealedGrid([...newRevealedGrid]);
        }, 1000);
      } else {
        const hasWon = revealedGrid.flat().every((isRevealed) => isRevealed);
        // console.log(hasWon);
        if (hasWon) {
          setTimeout(() => {
            alert("you won! ");
          });
        }
      }
      setPreviousClick(undefined);
    } else {
      setPreviousClick({
        row: rowIndex,
        col: colIndex,
      });
    }
  };

  // console.log(revealedGrid);

  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowInd) => (
          <div className="row" key={rowInd}>
            {row.map((number, colInd) => (
              <div
                key={colInd}
                className={
                  "card " + (revealedGrid[rowInd][colInd] ? "revealed" : "")
                }
                onClick={() => handleCardClick(rowInd, colInd)}
              >
                {revealedGrid[rowInd][colInd] ? number : " "}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
