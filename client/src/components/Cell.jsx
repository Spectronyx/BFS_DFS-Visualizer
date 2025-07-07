import { memo } from 'react';

// Cell Component - Represents individual grid cells
// Props: type (string), row (number), col (number), onClick (function)

const Cell = memo(({ type, row, col, onClick }) => {
  // Function to determine CSS classes based on cell type
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

  // Function to display icons for start and end cells
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