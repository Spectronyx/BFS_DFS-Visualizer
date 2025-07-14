# 🎯 Pathfinding Algorithm Visualizer

An interactive React.js web application that visualizes pathfinding algorithms on a grid. Perfect for educational presentations, teaching computer science concepts, and understanding how algorithms work step-by-step.

## 📚 Educational Purpose

This project is specifically designed for **teacher presentations** and **educational demonstrations**. All code is written in **pure JavaScript** (not TypeScript) with extensive comments to make it easy to understand and explain to students.

## 🚀 Live Demo

The application runs locally and provides an interactive grid where you can:
- Draw walls and obstacles
- Set start and end points
- Watch algorithms find paths in real-time
- See detailed statistics and performance metrics

## 🎨 Features

### Core Functionality
- **Interactive 20x20 Grid**: Click and drag to create walls, set start/end nodes
- **Multiple Algorithms**: BFS (Breadth-First Search) and DFS (Depth-First Search)
- **Real-time Visualization**: Watch algorithms explore the grid step-by-step
- **Animation Controls**: Adjustable speed from slow educational pace to fast execution
- **Path Highlighting**: Clear visualization of the final path found
- **Performance Statistics**: Track visited nodes, path length, and execution time

### Educational Features
- **Pure JavaScript Code**: No TypeScript complexity - easy to read and explain
- **Detailed Comments**: Every function and component thoroughly documented
- **Clear Algorithm Implementation**: Step-by-step algorithm logic with explanations
- **Visual Learning**: Color-coded cells show algorithm progress
- **Interactive Teaching Tool**: Perfect for classroom demonstrations

### User Interface
- **Modern Design**: Clean, professional interface using Tailwind CSS
- **Responsive Layout**: Works on different screen sizes
- **Intuitive Controls**: Easy-to-use buttons and mode selection
- **Real-time Feedback**: Immediate visual response to user actions

## 🧠 Algorithms Implemented

### Breadth-First Search (BFS)
- **Guarantee**: Always finds the shortest path
- **Strategy**: Explores nodes level by level (closest first)
- **Use Case**: When you need the optimal solution
- **Visualization**: Spreads outward from start point like a wave

### Depth-First Search (DFS)
- **Characteristic**: Explores as far as possible before backtracking
- **Strategy**: Goes deep into one path before trying others
- **Use Case**: Good for maze solving, may not find shortest path
- **Visualization**: Creates winding paths through the grid

## 🛠️ Technical Architecture

### Frontend Stack
- **React 18**: Modern React with functional components and hooks
- **JavaScript (JSX)**: Pure JavaScript for educational clarity
- **Vite**: Fast development server and build tool
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Accessible component library

### Backend Stack
- **Express.js**: Web server framework
- **Node.js**: JavaScript runtime
- **PostgreSQL**: Database (optional for extended features)
- **Drizzle ORM**: Type-safe database operations

### Key Components

#### Grid System
```javascript
// Grid Component - Renders the interactive pathfinding grid
// Handles cell rendering and user interactions
<Grid grid={grid} onCellClick={handleCellClick} />
```

#### Algorithm Engine
```javascript
// BFS Implementation - Guarantees shortest path
function breadthFirstSearch(grid, startNode, endNode, allowDiagonal) {
  // Queue-based exploration
  // Level-by-level node visiting
  // Path reconstruction
}
```

#### Control Panel
```javascript
// User Interface Controls
// Algorithm selection, speed control, grid management
<ControlPanel 
  onRunBFS={runBFS}
  onRunDFS={runDFS}
  animationSpeed={speed}
  onSpeedChange={setSpeed}
/>
```

## 📖 How to Use

### Basic Usage
1. **Set Start Point**: Click "Start" mode, then click on a cell
2. **Set End Point**: Click "End" mode, then click on a cell
3. **Draw Walls**: Click "Wall" mode, then click/drag to create obstacles
4. **Run Algorithm**: Click "Run BFS" or "Run DFS" to start visualization
5. **Watch Magic**: See the algorithm explore and find the path!

### Advanced Features
- **Animation Speed**: Use slider to control visualization speed
- **Diagonal Movement**: Toggle to allow/disallow diagonal pathfinding
- **Grid Size**: Adjust grid dimensions (10x10 to 30x30)
- **Clear Functions**: Reset paths only or clear entire grid
- **Statistics**: Monitor algorithm performance in real-time

### Teaching Tips
- Start with a simple path (no obstacles) to show basic algorithm behavior
- Add walls gradually to demonstrate how algorithms handle obstacles
- Compare BFS vs DFS on the same maze to show differences
- Use slow animation speed for detailed step-by-step explanation
- Point out the queue vs stack nature of BFS vs DFS

## 🔧 Installation & Setup

**You can simply use it by clicking the link:** https://grafalgovisualizer.netlify.app/

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- Modern web browser

### Quick Start
```bash
# Clone or download the project
# Navigate to project directory
cd pathfinding-visualizer

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5000
```

### Development Commands
```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking (for backend)
npm run type-check
```

## 📁 Project Structure

```
pathfinding-visualizer/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Grid.jsx          # Main grid component
│   │   │   ├── Cell.jsx          # Individual cell component
│   │   │   ├── ControlPanel.jsx  # UI controls
│   │   │   └── ui/               # Reusable UI components
│   │   ├── hooks/
│   │   │   └── usePathfinding.jsx # Main logic hook
│   │   ├── utils/
│   │   │   └── algorithms.jsx    # Algorithm implementations
│   │   ├── App.jsx               # Root component
│   │   ├── main.tsx             # App entry point
│   │   └── index.css            # Styles
│   └── index.html               # HTML template
├── server/
│   ├── index.ts                 # Express server
│   ├── routes.ts               # API routes
│   └── storage.ts              # Data storage
├── shared/
│   └── schema.ts               # Shared types
├── package.json                # Dependencies
├── vite.config.ts             # Build configuration
├── tailwind.config.ts         # Styling configuration
└── README.md                  # This file
```

## 🎓 Educational Use Cases

### For Teachers
- **Algorithm Comparison**: Demonstrate differences between search strategies
- **Complexity Analysis**: Show how algorithm performance varies with maze complexity
- **Problem Solving**: Illustrate how computers solve pathfinding problems
- **Interactive Learning**: Let students experiment with different configurations
- **Visual Understanding**: Help students grasp abstract algorithmic concepts

### For Students
- **Hands-on Learning**: Interact with algorithms rather than just reading about them
- **Immediate Feedback**: See results of algorithm choices instantly
- **Experimentation**: Try different maze configurations and observe behavior
- **Code Reading**: Study well-commented JavaScript implementations
- **Algorithm Analysis**: Compare performance metrics between different approaches

### Curriculum Integration
- **Computer Science Classes**: Perfect for data structures and algorithms courses
- **Mathematics**: Demonstrate graph theory and discrete mathematics concepts
- **Logic and Problem Solving**: Show systematic approaches to problem-solving
- **Programming Concepts**: Illustrate queues, stacks, and recursive thinking

## 🚀 Performance Considerations

### Optimization Features
- **React.memo**: Prevents unnecessary cell re-renders
- **Efficient State Management**: Minimizes state updates during animation
- **Configurable Grid Size**: Smaller grids for faster demonstration
- **Animation Controls**: Speed adjustment for performance tuning

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design
- Smooth animations on most devices
- Graceful degradation for older browsers

## 🎨 Customization Options

### Visual Themes
- Modify `index.css` for custom color schemes
- Adjust cell sizes and spacing
- Change animation styles and timing
- Customize UI component appearance

### Algorithm Extensions
- Add A* pathfinding algorithm
- Implement Dijkstra's algorithm
- Create maze generation algorithms
- Add weighted grid cells for advanced pathfinding

### Grid Enhancements
- Variable grid sizes
- Custom cell types (mud, water, etc.)
- Multiple start/end points
- Save/load maze configurations

## 🐛 Troubleshooting

### Common Issues
1. **Slow Performance**: Reduce grid size or animation speed
2. **No Path Found**: Ensure start and end nodes are accessible
3. **Walls Not Appearing**: Check that you're in "Wall" mode
4. **Animation Too Fast**: Adjust speed slider to slower setting

### Development Issues
1. **Dependencies**: Run `npm install` to ensure all packages are installed
2. **Port Conflicts**: Server runs on port 5000 by default
3. **Build Errors**: Check that all .jsx files are properly formatted
4. **Hot Reload**: Restart development server if changes aren't reflected

## 📈 Future Enhancements

### Planned Features
- **More Algorithms**: A*, Dijkstra's, Jump Point Search
- **Maze Generators**: Recursive backtracking, Prim's algorithm
- **3D Visualization**: Three-dimensional pathfinding
- **Performance Benchmarks**: Detailed algorithm comparison metrics
- **Export Features**: Save animations as GIF or video

### Educational Additions
- **Step-by-step Tutorials**: Built-in learning modules
- **Algorithm Explanations**: Detailed descriptions with examples
- **Quiz Mode**: Test understanding of algorithm concepts
- **Coding Challenges**: Let students implement their own algorithms

## 🤝 Contributing

This project is designed for educational use. Contributions that enhance the learning experience are welcome:

- **Bug fixes** and performance improvements
- **Educational content** and better explanations
- **New algorithms** with clear implementations
- **UI enhancements** for better usability
- **Documentation** improvements and examples

## 📜 License

This project is designed for educational purposes. Feel free to use it in:
- Classroom settings
- Educational presentations
- Student projects
- Learning materials

## 🙏 Acknowledgments

- **Educational Focus**: Designed specifically for teaching and learning
- **Algorithm Implementations**: Based on classic computer science algorithms
- **Modern Web Technologies**: Built with current best practices
- **Accessibility**: Designed to be inclusive and easy to use

## 📞 Support

For educational use questions or technical support:
- Review the code comments for detailed explanations
- Check the troubleshooting section above
- Experiment with different settings to understand behavior
- Use the project as a starting point for your own implementations

---

**Happy Teaching and Learning! 🎓**

This pathfinding visualizer makes algorithms come alive, turning abstract concepts into interactive, visual experiences that students will remember and understand.
