import { useState, useCallback, useRef } from 'react';
import { breadthFirstSearch, depthFirstSearch, resetGrid, createEmptyGrid } from '../utils/algorithms.jsx';

// Initial statistics for the grid
const initialStats = {
  totalCells: 400,
  wallCount: 0,
  visitedCount: 0,
  pathLength: 0,
  executionTime: 0
};

/**
 * Custom React Hook for Pathfinding Logic
 * Manages grid state, user interactions, and algorithm execution
 */
export function usePathfinding() {
  // Main state object containing all grid data and settings
  const [gridState, setGridState] = useState({
    grid: createEmptyGrid(20),
    startNode: null,
    endNode: null,
    isRunning: false,
    mode: 'wall',
    gridSize: 20,
    animationSpeed: 50,
    allowDiagonal: false,
    stats: initialStats,
    status: 'Ready'
  });

  const animationTimeouts = useRef([]);

  const clearTimeouts = useCallback(() => {
    animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    animationTimeouts.current = [];
  }, []);

  // Function to update grid statistics
  const updateStats = useCallback((grid, visitedCount = 0, pathLength = 0, executionTime = 0) => {
    const wallCount = grid.flat().filter(cell => cell.type === 'wall').length;
    const totalCells = grid.length * grid[0].length;
    
    setGridState(prev => ({
      ...prev,
      stats: {
        totalCells,
        wallCount,
        visitedCount,
        pathLength,
        executionTime
      }
    }));
  }, []);

  const handleCellClick = useCallback((row, col) => {
    if (gridState.isRunning) return;

    setGridState(prev => {
      const newGrid = prev.grid.map(gridRow => [...gridRow]);
      const cell = newGrid[row][col];

      switch (prev.mode) {
        case 'start':
          // Clear previous start node
          if (prev.startNode) {
            newGrid[prev.startNode.row][prev.startNode.col].type = 'empty';
          }
          // Set new start node
          if (cell.type === 'empty' || cell.type === 'end') {
            const newEndNode = cell.type === 'end' ? null : prev.endNode;
            cell.type = 'start';
            const newState = {
              ...prev,
              grid: newGrid,
              startNode: { row, col },
              endNode: newEndNode
            };
            updateStats(newGrid);
            return newState;
          }
          break;

        case 'end':
          // Clear previous end node
          if (prev.endNode) {
            newGrid[prev.endNode.row][prev.endNode.col].type = 'empty';
          }
          // Set new end node
          if (cell.type === 'empty' || cell.type === 'start') {
            const newStartNode = cell.type === 'start' ? null : prev.startNode;
            cell.type = 'end';
            const newState = {
              ...prev,
              grid: newGrid,
              startNode: newStartNode,
              endNode: { row, col }
            };
            updateStats(newGrid);
            return newState;
          }
          break;

        case 'wall':
          if (cell.type === 'empty') {
            cell.type = 'wall';
          } else if (cell.type === 'wall') {
            cell.type = 'empty';
          }
          const newState = { ...prev, grid: newGrid };
          updateStats(newGrid);
          return newState;
      }

      return prev;
    });
  }, [gridState.isRunning, updateStats]);

  // Function to animate algorithm execution with step-by-step visualization
  const animateAlgorithm = useCallback((result, algorithmName) => {
    clearTimeouts();
    const startTime = Date.now();
    
    setGridState(prev => ({ ...prev, isRunning: true, status: `Running ${algorithmName}...` }));

    // Animate visited nodes
    result.visitedNodesInOrder.forEach((node, index) => {
      const timeout = setTimeout(() => {
        setGridState(prev => {
          const newGrid = prev.grid.map(row => [...row]);
          if (newGrid[node.row][node.col].type === 'empty') {
            newGrid[node.row][node.col].type = 'visited';
          }
          return { ...prev, grid: newGrid };
        });
      }, index * gridState.animationSpeed);
      animationTimeouts.current.push(timeout);
    });

    // Animate path if found
    if (result.found && result.path.length > 0) {
      result.path.forEach((node, index) => {
        const timeout = setTimeout(() => {
          setGridState(prev => {
            const newGrid = prev.grid.map(row => [...row]);
            if (newGrid[node.row][node.col].type === 'visited' || 
                newGrid[node.row][node.col].type === 'empty') {
              newGrid[node.row][node.col].type = 'path';
            }
            return { ...prev, grid: newGrid };
          });
        }, (result.visitedNodesInOrder.length + index) * gridState.animationSpeed);
        animationTimeouts.current.push(timeout);
      });
    }

    // Complete animation
    const completionTimeout = setTimeout(() => {
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      const status = result.found ? 'Path Found' : 'No Path Found';
      
      setGridState(prev => ({
        ...prev,
        isRunning: false,
        status
      }));
      
      updateStats(gridState.grid, result.visitedNodesInOrder.length, result.path.length, executionTime);
    }, (result.visitedNodesInOrder.length + result.path.length) * gridState.animationSpeed + 500);
    
    animationTimeouts.current.push(completionTimeout);
  }, [gridState.animationSpeed, gridState.grid, clearTimeouts, updateStats]);

  const runBFS = useCallback(() => {
    if (!gridState.startNode || !gridState.endNode || gridState.isRunning) return;

    const cleanGrid = resetGrid(gridState.grid);
    const startCell = cleanGrid[gridState.startNode.row][gridState.startNode.col];
    const endCell = cleanGrid[gridState.endNode.row][gridState.endNode.col];
    
    setGridState(prev => ({ ...prev, grid: cleanGrid }));
    
    const result = breadthFirstSearch(cleanGrid, startCell, endCell, gridState.allowDiagonal);
    animateAlgorithm(result, 'BFS');
  }, [gridState, animateAlgorithm]);

  const runDFS = useCallback(() => {
    if (!gridState.startNode || !gridState.endNode || gridState.isRunning) return;

    const cleanGrid = resetGrid(gridState.grid);
    const startCell = cleanGrid[gridState.startNode.row][gridState.startNode.col];
    const endCell = cleanGrid[gridState.endNode.row][gridState.endNode.col];
    
    setGridState(prev => ({ ...prev, grid: cleanGrid }));
    
    const result = depthFirstSearch(cleanGrid, startCell, endCell, gridState.allowDiagonal);
    animateAlgorithm(result, 'DFS');
  }, [gridState, animateAlgorithm]);

  const resetPaths = useCallback(() => {
    if (gridState.isRunning) return;
    
    clearTimeouts();
    const cleanGrid = resetGrid(gridState.grid);
    setGridState(prev => ({
      ...prev,
      grid: cleanGrid,
      status: 'Ready'
    }));
    updateStats(cleanGrid);
  }, [gridState.isRunning, gridState.grid, clearTimeouts, updateStats]);

  const clearAll = useCallback(() => {
    if (gridState.isRunning) return;
    
    clearTimeouts();
    const emptyGrid = createEmptyGrid(gridState.gridSize);
    setGridState(prev => ({
      ...prev,
      grid: emptyGrid,
      startNode: null,
      endNode: null,
      status: 'Ready'
    }));
    updateStats(emptyGrid);
  }, [gridState.isRunning, gridState.gridSize, clearTimeouts, updateStats]);

  const setMode = useCallback((mode) => {
    setGridState(prev => ({ ...prev, mode }));
  }, []);

  const setAnimationSpeed = useCallback((speed) => {
    setGridState(prev => ({ ...prev, animationSpeed: speed }));
  }, []);

  const setAllowDiagonal = useCallback((allow) => {
    setGridState(prev => ({ ...prev, allowDiagonal: allow }));
  }, []);

  const setGridSize = useCallback((size) => {
    if (gridState.isRunning) return;
    
    clearTimeouts();
    const newGrid = createEmptyGrid(size);
    setGridState(prev => ({
      ...prev,
      grid: newGrid,
      gridSize: size,
      startNode: null,
      endNode: null,
      status: 'Ready'
    }));
    updateStats(newGrid);
  }, [gridState.isRunning, clearTimeouts, updateStats]);

  return {
    gridState,
    handleCellClick,
    runBFS,
    runDFS,
    resetPaths,
    clearAll,
    setMode,
    setAnimationSpeed,
    setAllowDiagonal,
    setGridSize
  };
}