# HerWork - Women-Focused Job & Service Marketplace

## Overview

HerWork is a full-stack web application that serves as a marketplace connecting women workers with employers for various services including housekeeping, elderly care, and other professional services. The platform enables women to find part-time, full-time, or on-demand work opportunities while providing households and businesses with access to trusted service providers.

The application features role-based access for both workers and employers, with comprehensive booking, payment, and review systems. Workers can manage their availability and earnings through a dedicated dashboard, while employers can search, book, and manage service providers based on their specific needs.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **UI Components**: Radix UI components with shadcn/ui design system for consistent, accessible interfaces
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server Framework**: Express.js with TypeScript for robust API development
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API architecture with structured route handlers
- **Error Handling**: Centralized error handling middleware with proper status codes
- **Development Tools**: Hot module replacement and development logging for efficient debugging

### Data Storage
- **Database**: PostgreSQL configured through Drizzle with connection pooling
- **Schema Management**: Drizzle migrations for version-controlled database changes
- **Data Models**: Comprehensive schema covering users, workers, bookings, reviews, transactions, and wallet functionality
- **Storage Interface**: Abstract storage layer allowing for flexible data access patterns

### Authentication & Authorization
- **User Management**: Phone-based authentication with email as optional field
- **Role-Based Access**: Separate user types (worker/employer) with distinct feature sets and navigation
- **Profile Management**: Comprehensive user profiles with verification badges and skill tracking
- **Session Handling**: Client-side user state persistence through localStorage

### Mobile-First Design
- **Responsive Layout**: Mobile-optimized UI with desktop compatibility
- **Touch Interface**: Mobile-friendly navigation with bottom tab bar
- **Progressive Enhancement**: Core functionality works across different screen sizes
- **Performance**: Optimized for mobile networks with efficient asset loading

## External Dependencies

### UI & Component Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled components for complex UI patterns
- **Lucide React**: Icon library providing consistent iconography throughout the application
- **React Hook Form**: Form handling with validation and performance optimization
- **Zod**: Schema validation for both client and server-side data validation

### Development Tools
- **TypeScript**: Static type checking for improved developer experience and code reliability
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **PostCSS**: CSS processing with autoprefixer for browser compatibility
- **ESBuild**: Fast JavaScript bundler for production builds

### Database & ORM
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **Drizzle ORM**: Type-safe ORM with schema migration capabilities
- **Drizzle Kit**: CLI tools for database schema management and migrations

### Deployment & Runtime
- **Node.js**: Runtime environment with ES modules support
- **Replit Integration**: Development environment with live preview and collaborative features
- **Environment Configuration**: Database URL and other secrets managed through environment variables