import { Cell, AlgorithmResult } from '../types/grid';

export function getNeighbors(grid: Cell[][], node: Cell, allowDiagonal: boolean = false): Cell[] {
  const neighbors: Cell[] = [];
  const { row, col } = node;
  const directions = allowDiagonal 
    ? [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    : [[-1, 0], [0, 1], [1, 0], [0, -1]];

  for (const [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;
    
    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
      const neighbor = grid[newRow][newCol];
      if (neighbor.type !== 'wall') {
        neighbors.push(neighbor);
      }
    }
  }
  
  return neighbors;
}

export function breadthFirstSearch(
  grid: Cell[][],
  startNode: Cell,
  endNode: Cell,
  allowDiagonal: boolean = false
): AlgorithmResult {
  const visitedNodesInOrder: Cell[] = [];
  const queue: Cell[] = [startNode];
  const visited = new Set<string>();
  
  startNode.distance = 0;
  visited.add(`${startNode.row}-${startNode.col}`);
  
  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    visitedNodesInOrder.push(currentNode);
    
    if (currentNode === endNode) {
      const path = getShortestPath(endNode);
      return { visitedNodesInOrder, path, found: true };
    }
    
    const neighbors = getNeighbors(grid, currentNode, allowDiagonal);
    
    for (const neighbor of neighbors) {
      const key = `${neighbor.row}-${neighbor.col}`;
      if (!visited.has(key)) {
        visited.add(key);
        neighbor.distance = currentNode.distance + 1;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  }
  
  return { visitedNodesInOrder, path: [], found: false };
}

export function depthFirstSearch(
  grid: Cell[][],
  startNode: Cell,
  endNode: Cell,
  allowDiagonal: boolean = false
): AlgorithmResult {
  const visitedNodesInOrder: Cell[] = [];
  const visited = new Set<string>();
  
  function dfsRecursive(node: Cell): boolean {
    const key = `${node.row}-${node.col}`;
    if (visited.has(key)) return false;
    
    visited.add(key);
    visitedNodesInOrder.push(node);
    
    if (node === endNode) return true;
    
    const neighbors = getNeighbors(grid, node, allowDiagonal);
    
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      if (!visited.has(neighborKey)) {
        neighbor.previousNode = node;
        if (dfsRecursive(neighbor)) return true;
      }
    }
    
    return false;
  }
  
  const found = dfsRecursive(startNode);
  const path = found ? getShortestPath(endNode) : [];
  
  return { visitedNodesInOrder, path, found };
}

function getShortestPath(endNode: Cell): Cell[] {
  const path: Cell[] = [];
  let currentNode: Cell | null = endNode;
  
  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  
  return path;
}

export function resetGrid(grid: Cell[][]): Cell[][] {
  return grid.map(row =>
    row.map(cell => ({
      ...cell,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      previousNode: null,
      type: cell.type === 'visited' || cell.type === 'path' ? 'empty' : cell.type
    }))
  );
}

export function createEmptyGrid(size: number): Cell[][] {
  const grid: Cell[][] = [];
  
  for (let row = 0; row < size; row++) {
    const currentRow: Cell[] = [];
    for (let col = 0; col < size; col++) {
      currentRow.push({
        row,
        col,
        type: 'empty',
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null
      });
    }
    grid.push(currentRow);
  }
  
  return grid;
}
