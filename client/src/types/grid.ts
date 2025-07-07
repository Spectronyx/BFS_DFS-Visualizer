export type CellType = 'empty' | 'wall' | 'start' | 'end' | 'visited' | 'path';

export type InteractionMode = 'wall' | 'start' | 'end';

export interface Cell {
  row: number;
  col: number;
  type: CellType;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  previousNode: Cell | null;
}

export interface Position {
  row: number;
  col: number;
}

export interface AlgorithmResult {
  visitedNodesInOrder: Cell[];
  path: Cell[];
  found: boolean;
}

export interface GridStats {
  totalCells: number;
  wallCount: number;
  visitedCount: number;
  pathLength: number;
  executionTime: number;
}

export interface GridState {
  grid: Cell[][];
  startNode: Position | null;
  endNode: Position | null;
  isRunning: boolean;
  mode: InteractionMode;
  gridSize: number;
  animationSpeed: number;
  allowDiagonal: boolean;
  stats: GridStats;
  status: string;
}
