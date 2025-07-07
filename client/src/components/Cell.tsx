import { memo } from 'react';
import { CellType } from '../types/grid';

interface CellProps {
  type: CellType;
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
}

const Cell = memo(({ type, row, col, onClick }: CellProps) => {
  const getCellClasses = () => {
    const baseClasses = "grid-cell";
    
    switch (type) {
      case 'wall':
        return `${baseClasses} grid-cell-wall`;
      case 'start':
        return `${baseClasses} grid-cell-start`;
      case 'end':
        return `${baseClasses} grid-cell-end`;
      case 'visited':
        return `${baseClasses} grid-cell-visited`;
      case 'path':
        return `${baseClasses} grid-cell-path`;
      default:
        return `${baseClasses} grid-cell-empty`;
    }
  };

  const getCellIcon = () => {
    switch (type) {
      case 'start':
        return <i className="fas fa-play text-white text-xs"></i>;
      case 'end':
        return <i className="fas fa-flag text-white text-xs"></i>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`${getCellClasses()} flex items-center justify-center`}
      onClick={() => onClick(row, col)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(row, col);
        }
      }}
    >
      {getCellIcon()}
    </div>
  );
});

Cell.displayName = 'Cell';

export default Cell;
