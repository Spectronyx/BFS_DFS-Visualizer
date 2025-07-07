import { memo } from 'react';

// Control Panel Component - User interface for algorithm controls and settings
// Props: Various settings and callback functions for user interactions

const ControlPanel = memo(({
  mode,
  isRunning,
  animationSpeed,
  allowDiagonal,
  gridSize,
  stats,
  status,
  onModeChange,
  onRunBFS,
  onRunDFS,
  onResetPaths,
  onClearAll,
  onSpeedChange,
  onDiagonalChange,
  onGridSizeChange
}) => {
  // Function to determine status message color based on current state
  const getStatusColor = () => {
    if (status.includes('Running')) return 'text-blue-600';
    if (status.includes('Found')) return 'text-green-600';
    if (status.includes('No Path')) return 'text-red-600';
    return 'text-green-600';
  };

  return (
    <div className="lg:w-80 bg-white shadow-lg border-r border-gray-200 p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          <i className="fas fa-route text-blue-600 mr-2"></i>
          Pathfinding Visualizer
        </h1>
        <p className="text-sm text-gray-600">Interactive algorithm visualization</p>
      </div>

      {/* Mode Selector */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
          <i className="fas fa-mouse-pointer text-gray-500 mr-2"></i>
          Interaction Mode
        </h3>
        <div className="space-y-2">
          <label className={`flex items-center p-2 rounded-lg hover:bg-white cursor-pointer transition-colors duration-200 ${mode === 'wall' ? 'bg-white ring-2 ring-blue-500' : ''}`}>
            <input 
              type="radio" 
              name="mode" 
              value="wall" 
              className="text-blue-600 mr-3" 
              checked={mode === 'wall'}
              onChange={() => onModeChange('wall')}
              disabled={isRunning}
            />
            <i className="fas fa-square-full text-red-500 mr-2"></i>
            <span className="text-sm font-medium">Draw Walls</span>
          </label>
          <label className={`flex items-center p-2 rounded-lg hover:bg-white cursor-pointer transition-colors duration-200 ${mode === 'start' ? 'bg-white ring-2 ring-blue-500' : ''}`}>
            <input 
              type="radio" 
              name="mode" 
              value="start" 
              className="text-blue-600 mr-3" 
              checked={mode === 'start'}
              onChange={() => onModeChange('start')}
              disabled={isRunning}
            />
            <i className="fas fa-play text-green-500 mr-2"></i>
            <span className="text-sm font-medium">Set Start Node</span>
          </label>
          <label className={`flex items-center p-2 rounded-lg hover:bg-white cursor-pointer transition-colors duration-200 ${mode === 'end' ? 'bg-white ring-2 ring-blue-500' : ''}`}>
            <input 
              type="radio" 
              name="mode" 
              value="end" 
              className="text-blue-600 mr-3" 
              checked={mode === 'end'}
              onChange={() => onModeChange('end')}
              disabled={isRunning}
            />
            <i className="fas fa-flag text-orange-500 mr-2"></i>
            <span className="text-sm font-medium">Set End Node</span>
          </label>
        </div>
      </div>

      {/* Algorithm Controls */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 flex items-center">
          <i className="fas fa-play-circle text-gray-500 mr-2"></i>
          Algorithms
        </h3>
        
        <button 
          className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center ${
            isRunning 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          onClick={onRunBFS}
          disabled={isRunning}
        >
          <i className="fas fa-layer-group mr-2"></i>
          Run BFS (Shortest Path)
        </button>
        
        <button 
          className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center ${
            isRunning 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
          onClick={onRunDFS}
          disabled={isRunning}
        >
          <i className="fas fa-code-branch mr-2"></i>
          Run DFS (Exploration)
        </button>
      </div>

      {/* Grid Controls */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-700 flex items-center">
          <i className="fas fa-tools text-gray-500 mr-2"></i>
          Grid Controls
        </h3>
        
        <button 
          className={`w-full font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center ${
            isRunning 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
          onClick={onResetPaths}
          disabled={isRunning}
        >
          <i className="fas fa-undo mr-2"></i>
          Reset Paths
        </button>
        
        <button 
          className={`w-full font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center ${
            isRunning 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          onClick={onClearAll}
          disabled={isRunning}
        >
          <i className="fas fa-trash mr-2"></i>
          Clear Everything
        </button>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 flex items-center">
          <i className="fas fa-cog text-gray-500 mr-2"></i>
          Settings
        </h3>
        
        {/* Animation Speed */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Animation Speed</label>
          <div className="flex items-center space-x-3">
            <i className="fas fa-turtle text-gray-400"></i>
            <input 
              type="range" 
              min="10" 
              max="200" 
              value={animationSpeed} 
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              disabled={isRunning}
            />
            <i className="fas fa-rabbit text-gray-400"></i>
          </div>
          <div className="text-xs text-gray-500 mt-1 text-center">{animationSpeed}ms per step</div>
        </div>

        {/* Diagonal Movement */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-600">Diagonal Movement</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={allowDiagonal}
              onChange={(e) => onDiagonalChange(e.target.checked)}
              disabled={isRunning}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Grid Size */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Grid Size</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            value={gridSize}
            onChange={(e) => onGridSizeChange(Number(e.target.value))}
            disabled={isRunning}
          >
            <option value="15">15 x 15</option>
            <option value="20">20 x 20</option>
            <option value="25">25 x 25</option>
            <option value="30">30 x 30</option>
          </select>
        </div>
      </div>

      {/* Status Panel */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
          <i className="fas fa-info-circle text-gray-500 mr-2"></i>
          Status
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={`font-medium ${getStatusColor()}`}>{status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Nodes Visited:</span>
            <span className="font-mono font-medium">{stats.visitedCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Path Length:</span>
            <span className="font-mono font-medium">{stats.pathLength || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Execution Time:</span>
            <span className="font-mono font-medium">{stats.executionTime ? `${stats.executionTime}ms` : '-'}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Legend</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white border-2 border-gray-300 mr-2 rounded"></div>
            <span>Empty</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 mr-2 rounded"></div>
            <span>Wall</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 mr-2 rounded flex items-center justify-center">
              <i className="fas fa-play text-white text-xs"></i>
            </div>
            <span>Start</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-500 mr-2 rounded flex items-center justify-center">
              <i className="fas fa-flag text-white text-xs"></i>
            </div>
            <span>End</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-400 mr-2 rounded"></div>
            <span>Visited</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-400 mr-2 rounded"></div>
            <span>Path</span>
          </div>
        </div>
      </div>
    </div>
  );
});

ControlPanel.displayName = 'ControlPanel';

export default ControlPanel;