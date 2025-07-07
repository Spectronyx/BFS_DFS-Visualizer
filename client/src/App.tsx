import { usePathfinding } from './hooks/usePathfinding';
import Grid from './components/Grid';
import ControlPanel from './components/ControlPanel';

function App() {
  const {
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
  } = usePathfinding();

  const getStatusMessage = () => {
    if (!gridState.startNode || !gridState.endNode) {
      return "Set start and end nodes to begin pathfinding.";
    }
    if (gridState.isRunning) {
      return "Algorithm is running. Please wait for completion.";
    }
    if (gridState.status === 'Path Found') {
      return "Path found! The shortest route is highlighted in yellow.";
    }
    if (gridState.status === 'No Path Found') {
      return "No path exists between start and end nodes.";
    }
    return "Ready to start pathfinding. Select an algorithm to run.";
  };

  const canRunAlgorithm = gridState.startNode && gridState.endNode && !gridState.isRunning;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Control Panel */}
      <ControlPanel
        mode={gridState.mode}
        isRunning={gridState.isRunning}
        animationSpeed={gridState.animationSpeed}
        allowDiagonal={gridState.allowDiagonal}
        gridSize={gridState.gridSize}
        stats={gridState.stats}
        status={gridState.status}
        onModeChange={setMode}
        onRunBFS={runBFS}
        onRunDFS={runDFS}
        onResetPaths={resetPaths}
        onClearAll={clearAll}
        onSpeedChange={setAnimationSpeed}
        onDiagonalChange={setAllowDiagonal}
        onGridSizeChange={setGridSize}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Grid Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Algorithm Visualization Grid</h2>
              <p className="text-sm text-gray-600 mt-1">Click cells to interact • Select mode in sidebar</p>
            </div>
            
            {/* Quick Actions (Mobile) */}
            <div className="flex space-x-2 mt-4 sm:mt-0 lg:hidden">
              <button 
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-200 ${
                  canRunAlgorithm 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
                onClick={runBFS}
                disabled={!canRunAlgorithm}
              >
                <i className="fas fa-layer-group mr-1"></i>BFS
              </button>
              <button 
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-200 ${
                  canRunAlgorithm 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
                onClick={runDFS}
                disabled={!canRunAlgorithm}
              >
                <i className="fas fa-code-branch mr-1"></i>DFS
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <Grid grid={gridState.grid} onCellClick={handleCellClick} />

        {/* Status Message */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className={`border rounded-lg p-4 flex items-center ${
            gridState.status.includes('No Path') 
              ? 'bg-red-50 border-red-200' 
              : gridState.status.includes('Found')
              ? 'bg-green-50 border-green-200'
              : 'bg-blue-50 border-blue-200'
          }`}>
            <i className={`mr-3 ${
              gridState.status.includes('No Path') 
                ? 'fas fa-exclamation-triangle text-red-500' 
                : gridState.status.includes('Found')
                ? 'fas fa-check-circle text-green-500'
                : 'fas fa-info-circle text-blue-500'
            }`}></i>
            <div>
              <p className={`text-sm font-medium ${
                gridState.status.includes('No Path') 
                  ? 'text-red-800' 
                  : gridState.status.includes('Found')
                  ? 'text-green-800'
                  : 'text-blue-800'
              }`}>Algorithm Status</p>
              <p className={`text-sm ${
                gridState.status.includes('No Path') 
                  ? 'text-red-600' 
                  : gridState.status.includes('Found')
                  ? 'text-green-600'
                  : 'text-blue-600'
              }`}>{getStatusMessage()}</p>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="mt-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="text-2xl font-bold text-blue-600 font-mono">{gridState.stats.totalCells}</div>
              <div className="text-xs text-gray-600">Total Cells</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="text-2xl font-bold text-red-500 font-mono">{gridState.stats.wallCount}</div>
              <div className="text-xs text-gray-600">Walls</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="text-2xl font-bold text-blue-400 font-mono">{gridState.stats.visitedCount}</div>
              <div className="text-xs text-gray-600">Visited</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="text-2xl font-bold text-yellow-600 font-mono">{gridState.stats.pathLength || 0}</div>
              <div className="text-xs text-gray-600">Path Length</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
