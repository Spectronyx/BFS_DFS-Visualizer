import { memo } from 'react';
import Cell from './Cell';
import { Cell as CellType } from '../types/grid';

interface GridProps {
  grid: CellType[][];
  onCellClick: (row: number, col: number) => void;
}

const Grid = memo(({ grid, onCellClick }: GridProps) => {
  const gridSize = grid.length;
  
  return (
    <div className="flex justify-center">
      <div className="inline-block bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div 
          className="grid gap-0.5 p-1"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                type={cell.type}
                row={rowIndex}
                col={colIndex}
                onClick={onCellClick}
              />
            ))
          )}
        </div>
        <div className="text-xs text-gray-400 mt-4 text-center font-mono">
          Grid: {gridSize} × {gridSize} cells | Click cells to interact
        </div>
      </div>
    </div>
  );
});

Grid.displayName = 'Grid';

export default Grid;
