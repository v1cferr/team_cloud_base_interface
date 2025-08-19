# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is the frontend interface of a home automation project management system. It's an Angular 17 application written in TypeScript that provides a simple web interface for managing automation projects. The application communicates with a Java Spring Boot backend API running on localhost:8080.

## Key Architecture Components

**Main Application Structure:**
- **AppComponent**: Root component with title "Automation Test"
- **ProjectsComponent**: Main view for listing and managing projects, handles CRUD operations
- **ProjectDetailComponent**: Detail view for editing individual projects (uses @Input binding)
- **ProjectService**: Service layer for HTTP API communication with the backend
- **Project Interface**: Simple data model with `id: number` and `name: string`

**Backend Integration:**
- API Base URL: `http://localhost:8080/projects`
- The companion backend is a Java Spring Boot application with PostgreSQL database
- API documentation available at: `http://localhost:8080/swagger-ui/index.html` when backend is running
- Full REST API with GET, POST, PUT, DELETE operations for project management

**TypeScript Configuration:**
- Strict mode enabled with comprehensive type checking
- ES2022 target with modern Angular features
- Standalone components disabled (uses traditional NgModule architecture)

## Development Commands

**Setup and Installation:**
```bash
npm install  # Install dependencies
```

**Development Server:**
```bash
npm start           # Start dev server on http://localhost:4200
ng serve           # Alternative command
ng serve --open    # Start dev server and open browser
```

**Build Commands:**
```bash
npm run build                    # Production build
ng build                        # Production build (default)
ng build --configuration development  # Development build
npm run watch                   # Development build with file watching
```

**Testing:**
```bash
npm test     # Run unit tests with Karma
ng test      # Alternative test command
```

**Code Generation:**
```bash
ng generate component component-name    # Generate new component
ng generate service service-name        # Generate new service
ng generate module module-name          # Generate new module
```

## Development Workflow

**Backend Dependency:**
This frontend requires the companion backend API (`team_cloud_base_api`) to be running on port 8080. Ensure PostgreSQL is configured and the Spring Boot application is started before developing frontend features.

**VS Code Integration:**
- Configured launch tasks for `ng serve` and `ng test`
- Chrome debugging configuration available
- Recommended extension: Angular Language Service

**API Integration Pattern:**
All HTTP requests go through `ProjectService` which handles:
- HTTP headers with `Content-Type: application/json`
- Observable-based async operations using RxJS
- Error handling and response mapping

**Component Communication:**
- Parent-child communication via `@Input()` decorators
- Service injection for shared state and API calls
- Event-driven updates using service methods and subscriptions

## Project-Specific Notes

**Language:** This is a Portuguese-language project ("Automation Test" / "Software front-end para gerenciamento de projetos de automação residencial")

**Simple CRUD Structure:** The application follows a straightforward pattern:
1. Load projects from API on component init
2. Display projects in a list with selection capability
3. Show selected project details in a separate component
4. Support add, update, and delete operations with immediate UI refresh

**No Routing:** Currently uses a single-page approach with component visibility rather than Angular routing

**Build Output:** Production builds output to `dist/test-front-app/`
