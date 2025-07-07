// Cell types: 'empty', 'wall', 'start', 'end', 'visited', 'path'
// Interaction modes: 'wall', 'start', 'end'

// Cell object structure:
// {
//   row: number,
//   col: number,
//   type: string,
//   isVisited: boolean,
//   isPath: boolean,
//   distance: number,
//   previousNode: Cell or null
// }

// Position object structure:
// {
//   row: number,
//   col: number
// }

// Algorithm result structure:
// {
//   visitedNodesInOrder: Cell[],
//   path: Cell[],
//   found: boolean
// }

// Grid stats structure:
// {
//   totalCells: number,
//   wallCount: number,
//   visitedCount: number,
//   pathLength: number,
//   executionTime: number
// }

// Grid state structure:
// {
//   grid: Cell[][],
//   startNode: Position or null,
//   endNode: Position or null,
//   isRunning: boolean,
//   mode: string,
//   gridSize: number,
//   animationSpeed: number,
//   allowDiagonal: boolean,
//   stats: GridStats,
//   status: string
// }
