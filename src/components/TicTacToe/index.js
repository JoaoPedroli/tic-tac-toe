import { useState } from "react";
import styles from "./styles.module.scss";
import { MdClose, MdOutlineCircle } from "react-icons/md";

export const TicTacToe = () => {
	const XOption = <MdClose size={30} color="#fff" />;
	const OOption = <MdOutlineCircle size={30} color="#fff" />;

	const [current, setCurrent] = useState(XOption);
	const [grid, setGrid] = useState([
		["", "", ""],
		["", "", ""],
		["", "", ""],
	]);

	const handleChangeGrid = (i, j) => {
		if (grid[i][j]) return;

		let newGrid = grid;
		newGrid[i][j] = current;
		setCurrent(e =>
			e.type?.name === XOption.type.name ? OOption : XOption
		);
		setGrid(newGrid);
	};

	const verifyAllGridGroups = () => {
		let Igroups = [[], [], []];
		let Jgroups = [[], [], []];
    
		assignValuesToIJGroups();
    
		const firstDiagonal = [grid[0][0], grid[1][1], grid[2][2]];
		const secondDiagonal = [grid[2][0], grid[1][1], grid[0][2]];

		const finishHorizontalGroup = verify(Jgroups);
		const finishVerticalGroup = verify(Igroups);
		const finishDiagonalGroup = verify([firstDiagonal, secondDiagonal]);

		if (
			finishHorizontalGroup ||
			finishVerticalGroup ||
			finishDiagonalGroup
		) {
			alert("End Game");
			return;
		}
    
    function assignValuesToIJGroups() {
      for (var i = 0; i < 3; ++i) {
        for (var j = 0; j < 3; ++j) {
          Igroups[j].push(grid[i][j]);
          Jgroups[i].push(grid[i][j]);
        }
      }
    }

		function verify(group = Array < Array(3) > 3) {
			console.log(Igroups, Jgroups);

			let ok;
			group.map((v, i) => {
				if (ok) return;
				ok = true;
				v.map((vv, j) => {
					if (j == 2) return;
					if (!vv || !group[i][j + 1]) {
						ok = false;
						return;
					}

					if (vv.type.name === group[i][j + 1].type.name) {
						ok = ok;
					} else {
						ok = false;
						return;
					}
				});
			});

			return ok;
		}
	};

	return (
		<div className={styles.container}>
			{grid.map((gridI, i) => {
				return (
					<div key={i} className={styles.subcontainer}>
						{gridI.map((gridJ, j) => {
							return (
								<div
									key={j}
									onClick={() => {
										handleChangeGrid(i, j);
										verifyAllGridGroups();
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
