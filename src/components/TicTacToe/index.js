import { useState } from "react";
import styles from "./styles.module.scss";

export const TicTacToe = () => {
  const [current, setCurrent] = useState("X");
  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const handleChangeGrid = (i, j) => {
    if (grid[i][j]) return;

    let newGrid = grid;
    newGrid[i][j] = current;
    setCurrent(current === "X" ? "O" : "X");
    setGrid(newGrid);
  };

  const dfs = (i, j, directionI, directionJ, parent, total) => {
    if (
      i < 0 || i === 3 || j < 0 || j === 3 ||
      !grid[i][j] || parent !== grid[i][j]
    ) {
      return;
    }
      
    if (total === 2) {
      alert("End Game");
      return;
    }

    if (directionI === -2 && directionJ === -2) {
      if(i === 1 && j === 1) {
        caseInMiddle();
        return;
      }
      dfs(i + 1, j, 1, 0, grid[i][j], total + 1);
      dfs(i - 1, j, -1, 0, grid[i][j], total + 1);
      dfs(i, j + 1, 0, 1, grid[i][j], total + 1);
      dfs(i, j - 1, 0, -1, grid[i][j], total + 1);
      dfs(i + 1, j + 1, 1, 1, grid[i][j], total + 1);
      dfs(i - 1, j - 1, -1, -1, grid[i][j], total + 1);
      dfs(i + 1, j - 1, 1, -1, grid[i][j], total + 1);
      dfs(i - 1, j + 1, -1, 1, grid[i][j], total + 1);
      return;
    }

    dfs(
      i + directionI,
      j + directionJ,
      directionI,
      directionJ,
      grid[i][j], total + 1,
    );

    function caseInMiddle() {
      if(grid[i+1][j] === parent && grid[i-1][j] === parent) {
        alert("End Game");
        return;
      }
      if(grid[i][j+1] === parent && grid[i][j-1] === parent) {
        alert("End Game");
        return;
      }
      if(grid[i+1][j+1] === parent && grid[i-1][j-1] === parent) {
        alert("End Game");
        return;
      }
      if(grid[i+1][j-1] === parent && grid[i-1][j+1] === parent) {
        alert("End Game");
        return;
      }
    }
  };

  return (
    <div className={styles.container}>
      {grid.map((gridI, i) => {
        return (
          <div className={styles.subcontainer}>
            {gridI.map((gridJ, j) => {
              return (
                <div
                  onClick={() => {
                    handleChangeGrid(i, j);
                    dfs(i, j, -2, -2, grid[i][j], 0);
                  }}
                >
                  <span>{gridJ}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
