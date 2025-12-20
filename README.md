# Fitness Management System

A comprehensive full-stack application for managing fitness center operations, featuring a React frontend and Spring Boot backend with role-based access control and advanced user management capabilities.

## Project Overview

This Fitness Management System is a complete web application designed to streamline gym operations. It provides separate interfaces for administrators, trainers, and members, with features including membership management, class scheduling, diet planning, inventory tracking, and feedback collection. The system implements modern security practices including two-factor authentication (2FA) and password reset functionality.

## Features

### Core Functionality
- **User Management**: Multi-role system (Admin, Trainer, Member) with role-based access control
- **Membership Plans**: Subscription management and member plan tracking
- **Class Scheduling**: Trainer assignment and class management
- **Diet Planning**: Personalized diet recommendations for members
- **Inventory Management**: Track gym equipment and supplies
- **Location Management**: Cascading location system (Province → District → Sector → Cell → Village)
- **Feedback System**: Member feedback collection and management
- **Dashboard & Analytics**: Business insights and summary statistics
- **Reports**: Comprehensive reporting with charts and analytics

### Advanced Features
- **Two-Factor Authentication (2FA)**: Enhanced security for user accounts
- **Password Reset**: Email-based password recovery system
- **Global Search**: Search across all entities
- **Pagination**: Efficient data display for large datasets
- **Column-based Filtering**: Advanced table search capabilities
- **Responsive Design**: Mobile-friendly interface

## Technologies Used

### Frontend
- React 17+
- React Router for navigation
- Axios for API communication
- CSS3 for styling
- Chart.js for analytics visualization

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security with JWT authentication
- JPA/Hibernate for ORM
- Maven for dependency management
- MySQL/PostgreSQL (configurable)

## Setup Instructions

### Prerequisites
- Node.js 14+ and npm
- Java 17 or higher
- Maven 3.6.3 or higher
- MySQL 8.0 or PostgreSQL 13 or higher

### Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd BackEnd/BackEnd
   ```

2. **Configure Database**
   - Update `src/main/resources/application.properties` with your database credentials
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/fitness_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **API Documentation**
   - Swagger UI: http://localhost:8080/swagger-ui.html
   - API Docs: http://localhost:8080/v3/api-docs

### Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd FrontEnd/FrontEnd
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure API Endpoint**
   - Update the API base URL in service files if needed (default: http://localhost:8080)

4. **Run Development Server**
   ```bash
   npm start
   ```
   - Open [http://localhost:3000](http://localhost:3000) to view in browser

5. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

### Backend Structure
```
BackEnd/
└── src/
    └── main/
        ├── java/com/app/
        │   ├── config/          # Security and application configuration
        │   ├── controllers/     # REST API endpoints
        │   ├── pojos/          # Entity/Model classes
        │   ├── dao/            # JPA Repositories
        │   ├── services/       # Business logic layer
        │   └── dto/            # Data Transfer Objects
        └── resources/
            └── application.properties
```

### Frontend Structure
```
FrontEnd/
└── src/
    ├── components/         # Reusable components
    │   └── common/        # Shared components (ProtectedRoute, etc.)
    ├── pages/             # Page components
    │   ├── Dashboard/     # Admin dashboard
    │   ├── Members/       # Member management
    │   ├── Plans/         # Plan management
    │   ├── Trainers/      # Trainer management
    │   ├── Locations/     # Location management
    │   ├── Inventory/     # Inventory management
    │   ├── Feedback/      # Feedback system
    │   ├── Diet/          # Diet management
    │   ├── MemberPlan/    # Subscription management
    │   └── User/          # User self-service pages
    ├── services/          # API service layer
    ├── helpers/           # Utility functions
    ├── newFront/          # Authentication and profile pages
    └── App.js             # Main application router
```

## User Roles & Access

- **Admin**: Full system access including user management, reports, and all CRUD operations
- **Trainer**: Access to assigned classes and member information
- **Member/User**: Self-service portal for viewing plans, diets, trainers, and providing feedback

## API Endpoints

Key API endpoints include:
- `/api/auth/*` - Authentication and authorization
- `/api/user/*` - User management
- `/api/plan/*` - Membership plans
- `/api/trainer/*` - Trainer management
- `/api/location/*` - Location management
- `/api/diet/*` - Diet plans
- `/api/feedback/*` - Feedback system
- `/api/inventory/*` - Inventory management

## Work Done By

**Name**: Kwizera Sandrine  
**ID**: 26104

## License

This project is developed as part of academic coursework at AUCA (Adventist University of Central Africa).
