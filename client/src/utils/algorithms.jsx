// Pathfinding Algorithms in JavaScript
// This file contains BFS and DFS algorithms for finding paths in a grid

/**
 * Gets neighboring cells of a given node
 * @param {Array} grid - 2D array representing the grid
 * @param {Object} node - Current cell object
 * @param {boolean} allowDiagonal - Whether to include diagonal neighbors
 * @returns {Array} Array of neighboring cells
 */
export function getNeighbors(grid, node, allowDiagonal = false) {
  const neighbors = [];
  const { row, col } = node;
  
  // Define movement directions
  // If diagonal is allowed: 8 directions, otherwise: 4 directions (up, right, down, left)
  const directions = allowDiagonal 
    ? [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    : [[-1, 0], [0, 1], [1, 0], [0, -1]];

  // Check each direction
  for (const [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;
    
    // Check if the new position is within grid bounds
    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
      const neighbor = grid[newRow][newCol];
      // Only add neighbors that are not walls
      if (neighbor.type !== 'wall') {
        neighbors.push(neighbor);
      }
    }
  }
  
  return neighbors;
}

/**
 * Breadth-First Search (BFS) Algorithm
 * Guarantees the shortest path in an unweighted grid
 * @param {Array} grid - 2D array representing the grid
 * @param {Object} startNode - Starting cell
 * @param {Object} endNode - Target cell
 * @param {boolean} allowDiagonal - Whether diagonal movement is allowed
 * @returns {Object} Result containing visited nodes, path, and success status
 */
export function breadthFirstSearch(grid, startNode, endNode, allowDiagonal = false) {
  // Arrays to track visited nodes and the queue for BFS
  const visitedNodesInOrder = [];
  const queue = [startNode];
  const visited = new Set();
  
  // Initialize starting node
  startNode.distance = 0;
  visited.add(`${startNode.row}-${startNode.col}`);
  
  // BFS main loop
  while (queue.length > 0) {
    // Get the next node from front of queue (FIFO - First In, First Out)
    const currentNode = queue.shift();
    visitedNodesInOrder.push(currentNode);
    
    // Check if we reached the target
    if (currentNode === endNode) {
      const path = getShortestPath(endNode);
      return { visitedNodesInOrder, path, found: true };
    }
    
    // Explore all neighbors
    const neighbors = getNeighbors(grid, currentNode, allowDiagonal);
    
    for (const neighbor of neighbors) {
      const key = `${neighbor.row}-${neighbor.col}`;
      if (!visited.has(key)) {
        visited.add(key);
        neighbor.distance = currentNode.distance + 1;
        neighbor.previousNode = currentNode; // For path reconstruction
        queue.push(neighbor); // Add to end of queue
      }
    }
  }
  
  // No path found
  return { visitedNodesInOrder, path: [], found: false };
}

/**
 * Depth-First Search (DFS) Algorithm
 * Explores as far as possible along each branch before backtracking
 * @param {Array} grid - 2D array representing the grid
 * @param {Object} startNode - Starting cell
 * @param {Object} endNode - Target cell
 * @param {boolean} allowDiagonal - Whether diagonal movement is allowed
 * @returns {Object} Result containing visited nodes, path, and success status
 */
export function depthFirstSearch(grid, startNode, endNode, allowDiagonal = false) {
  const visitedNodesInOrder = [];
  const visited = new Set();
  
  // Recursive DFS function
  function dfsRecursive(node) {
    const key = `${node.row}-${node.col}`;
    if (visited.has(key)) return false;
    
    // Mark as visited and add to order
    visited.add(key);
    visitedNodesInOrder.push(node);
    
    // Check if we reached the target
    if (node === endNode) return true;
    
    // Explore all neighbors recursively (depth-first)
    const neighbors = getNeighbors(grid, node, allowDiagonal);
    
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      if (!visited.has(neighborKey)) {
        neighbor.previousNode = node; // For path reconstruction
        if (dfsRecursive(neighbor)) return true; // If path found, return true
      }
    }
    
    return false; // No path found from this branch
  }
  
  // Start the recursive search
  const found = dfsRecursive(startNode);
  const path = found ? getShortestPath(endNode) : [];
  
  return { visitedNodesInOrder, path, found };
}

/**
 * Reconstructs the shortest path from start to end
 * Works backward from end node using previousNode links
 * @param {Object} endNode - The target node
 * @returns {Array} Array of nodes representing the path
 */
function getShortestPath(endNode) {
  const path = [];
  let currentNode = endNode;
  
  // Follow the previousNode chain backward to reconstruct path
  while (currentNode !== null) {
    path.unshift(currentNode); // Add to beginning of array
    currentNode = currentNode.previousNode;
  }
  
  return path;
}

/**
 * Resets the grid by clearing visited/path cells and algorithm data
 * Keeps walls, start, and end nodes intact
 * @param {Array} grid - 2D grid array
 * @returns {Array} New cleaned grid
 */
export function resetGrid(grid) {
  return grid.map(row =>
    row.map(cell => ({
      ...cell,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      previousNode: null,
      // Reset visited/path cells back to empty, keep other types
      type: cell.type === 'visited' || cell.type === 'path' ? 'empty' : cell.type
    }))
  );
}

/**
 * Creates a new empty grid of specified size
 * All cells start as 'empty' type
 * @param {number} size - Grid size (size x size)
 * @returns {Array} New 2D grid array
 */
export function createEmptyGrid(size) {
  const grid = [];
  
  // Create rows
  for (let row = 0; row < size; row++) {
    const currentRow = [];
    // Create columns
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