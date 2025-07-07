# Pathfinding Visualizer

## Overview

This is a React.js web application that visualizes pathfinding algorithms on an interactive grid. The application allows users to create obstacles, set start and end points, and watch algorithms like BFS (Breadth-First Search) and DFS (Depth-First Search) find paths in real-time with smooth animations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for modern, accessible UI components
- **State Management**: Custom React hooks with local state management
- **Animation**: CSS transitions and JavaScript timeouts for algorithm visualization

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database serverless PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store

### Build System
- **Frontend**: Vite with React plugin for fast development and optimized builds
- **Backend**: esbuild for server bundling
- **Development**: tsx for TypeScript execution in development

## Key Components

### Grid System
- **Grid Component**: Renders the interactive pathfinding grid with configurable size
- **Cell Component**: Individual grid cells with different states (empty, wall, start, end, visited, path)
- **Interactive Modes**: Wall placement, start node setting, end node setting

### Algorithm Implementation
- **BFS Algorithm**: Guarantees shortest path, explores nodes level by level
- **DFS Algorithm**: Explores as far as possible along each branch before backtracking
- **Animation System**: Step-by-step visualization with configurable speed
- **Path Reconstruction**: Highlights the final path from start to end

### Control Panel
- **Algorithm Selection**: Buttons to run BFS or DFS algorithms
- **Grid Controls**: Reset paths, clear all, mode switching
- **Settings**: Animation speed control, diagonal movement toggle, grid size adjustment
- **Statistics**: Real-time display of visited nodes, path length, execution time

### UI Components (shadcn/ui)
- Modern, accessible React components
- Consistent design system with CSS variables
- Dark/light mode support built-in

## Data Flow

1. **User Interaction**: User clicks on grid cells or control buttons
2. **State Updates**: Grid state managed through custom `usePathfinding` hook
3. **Algorithm Execution**: Selected algorithm runs with animated step visualization
4. **Real-time Updates**: Grid cells update their visual state during algorithm execution
5. **Statistics Tracking**: Performance metrics calculated and displayed

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React DOM for UI rendering
- **Database**: Drizzle ORM with PostgreSQL driver (@neondatabase/serverless)
- **UI Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **Forms**: React Hook Form with Zod validation

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Vite**: Fast development server and build tool
- **ESBuild**: Fast JavaScript bundler for production builds

### Database Schema
- **Users Table**: Basic user management with username/password
- **Session Storage**: PostgreSQL-backed session management

## Deployment Strategy

### Development
- Frontend served by Vite dev server with HMR (Hot Module Replacement)
- Backend runs with tsx for TypeScript execution
- Database migrations handled by Drizzle Kit

### Production
- Frontend built to static assets using Vite
- Backend bundled with esbuild to single JavaScript file
- Served as Express application with static file serving
- Environment variables for database connection and configuration

### Build Process
1. `npm run build`: Builds both frontend and backend
2. Frontend: Vite builds to `dist/public`
3. Backend: esbuild bundles to `dist/index.js`
4. `npm start`: Runs production server

## Changelog
- July 07, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.