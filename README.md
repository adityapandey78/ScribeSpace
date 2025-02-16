# ScribeSpace - Modern Blogging Platform

## Overview
ScribeSpace is a modern, feature-rich blogging platform built with React and powered by Appwrite backend. This project demonstrates the implementation of a full-stack web application with authentication, content management, and real-time updates.

## Technologies Used

### Frontend
- **React 18** - Modern UI library for building user interfaces
- **Redux Toolkit** - State management with modern Redux
- **React Router DOM** - Client-side routing
- **TinyMCE React** - Rich text editor integration
- **React Hook Form** - Form handling and validation
- **HTML React Parser** - HTML content parsing

### Backend & Services
- **Appwrite** - Backend as a Service (BaaS) for:
  - Authentication
  - Database
  - File Storage
  - Real-time updates

### Development Tools
- **Vite** - Next-generation frontend build tool
- **TailwindCSS** - Utility-first CSS framework
- **ESLint** - Code linting and style enforcement
- **PostCSS** - CSS processing and transformations

## Key Learning Outcomes

1. **Modern React Development**
   - Functional components and hooks
   - Custom hook creation
   - React 18 features and best practices

2. **State Management**
   - Redux Toolkit implementation
   - Global state architecture
   - Action creators and reducers

3. **Backend Integration**
   - Appwrite service integration
   - RESTful API consumption
   - Real-time data synchronization

4. **Authentication & Security**
   - User authentication flows
   - Protected routes
   - Secure data handling

5. **Modern Frontend Tools**
   - Vite build system
   - TailwindCSS styling
   - ESLint configuration

6. **Form Handling**
   - Complex form validations
   - Rich text editing
   - File uploads

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.sample` to `.env` and configure your Appwrite credentials
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure
```
src/
├── appwrite/    # Appwrite service configurations
├── components/  # Reusable UI components
├── conf/        # Configuration files
├── pages/       # Route components
└── store/       # Redux store and slices
```

## Contributing
Feel free to submit issues and enhancement requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
