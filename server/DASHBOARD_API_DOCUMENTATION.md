# Course Dashboard API Documentation

## Overview

This comprehensive course dashboard system provides detailed analytics, progress tracking, and personalized learning paths for both students and administrators.

## Authentication

All dashboard endpoints require authentication. Include the access token in your request cookies.

## Endpoints

### 1. Frontend Route Handler

**GET** `/course-dashboard`

- **Purpose**: Handles frontend route requests (for SPA/Next.js applications)
- **Authentication**: Not required
- **Response**: JSON with route information and query parameters

```json
{
  "success": true,
  "message": "Frontend route: /course-dashboard",
  "route": "/course-dashboard?_rsc=qw03r",
  "query": { "_rsc": "qw03r" },
  "note": "This should be handled by your frontend application"
}
```

### 2. Main Dashboard

**GET** `/api/v1/dashboard/`

- **Purpose**: Comprehensive dashboard data based on user role
- **Authentication**: Required
- **User Roles**: Student, Admin

#### Student Response:

```json
{
  "success": true,
  "user": {
    "id": "userId",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user"
  },
  "studentData": {
    "overview": {
      "totalEnrolledCourses": 5,
      "completedCourses": 2,
      "inProgressCourses": 2,
      "notStartedCourses": 1
    },
    "courses": {
      "enrolled": [...],
      "completed": [...],
      "inProgress": [...],
      "notStarted": [...]
    },
    "recentActivity": [...],
    "orders": [...]
  }
}
```

#### Admin Response:

```json
{
  "success": true,
  "user": {...},
  "adminData": {
    "overview": {
      "totalCourses": 50,
      "totalUsers": 1000,
      "totalOrders": 500,
      "monthlyStats": {
        "newCoursesThisMonth": 5,
        "newUsersThisMonth": 100,
        "ordersThisMonth": 50
      }
    },
    "recent": {
      "courses": [...],
      "users": [...],
      "orders": [...]
    }
  }
}
```

### 3. Dashboard Overview

**GET** `/api/v1/dashboard/overview`

- **Purpose**: Get available features and permissions for current user
- **Authentication**: Required

```json
{
  "success": true,
  "userRole": "user",
  "features": {
    "availableRoutes": [
      "/api/v1/dashboard/ - Main dashboard",
      "/api/v1/dashboard/learning-path - Learning recommendations"
    ],
    "permissions": {
      "canViewAnalytics": false,
      "canManageCourses": false,
      "canViewLearningPath": true
    }
  }
}
```

### 4. Quick Statistics

**GET** `/api/v1/dashboard/quick-stats`

- **Purpose**: Get quick statistics based on user role
- **Authentication**: Required

#### Student Stats:

```json
{
  "success": true,
  "userRole": "user",
  "studentStats": {
    "enrolledCourses": 5,
    "totalOrders": 5
  }
}
```

#### Admin Stats:

```json
{
  "success": true,
  "userRole": "admin",
  "adminStats": {
    "totalCourses": 50,
    "totalUsers": 1000,
    "totalOrders": 500
  }
}
```

### 5. Course Analytics (Admin Only)

**GET** `/api/v1/dashboard/analytics/:courseId`

- **Purpose**: Detailed analytics for a specific course
- **Authentication**: Required (Admin only)
- **Parameters**: courseId (URL parameter)

```json
{
  "success": true,
  "course": {
    "id": "courseId",
    "name": "Course Name",
    "description": "Course Description",
    "price": 99.99,
    "level": "Beginner"
  },
  "analytics": {
    "overview": {
      "totalEnrollments": 100,
      "totalRevenue": 9999,
      "averageRating": 4.5,
      "totalReviews": 50
    },
    "trends": {
      "monthlyEnrollments": [
        {
          "month": "January 2024",
          "enrollments": 20,
          "revenue": 1999.8
        }
      ]
    },
    "enrollments": [...],
    "reviews": [...]
  }
}
```

### 6. User Learning Path

**GET** `/api/v1/dashboard/learning-path`

- **Purpose**: Get personalized learning recommendations
- **Authentication**: Required

```json
{
  "success": true,
  "currentCourses": [...],
  "recommendedCourses": [...],
  "skillsToLearn": ["JavaScript", "React", "Node.js"],
  "completionStats": {
    "totalCourses": 5,
    "skillsAcquired": 3
  }
}
```

### 7. Course Progress Tracking

**GET** `/api/v1/dashboard/progress/:courseId`

- **Purpose**: Get detailed progress for a specific course
- **Authentication**: Required
- **Parameters**: courseId (URL parameter)

```json
{
  "success": true,
  "course": {
    "id": "courseId",
    "name": "Course Name",
    "description": "Course Description"
  },
  "progress": {
    "completionPercentage": 75,
    "totalLessons": 20,
    "completedLessons": 15,
    "isCompleted": false,
    "enrolledAt": "2024-01-01T00:00:00.000Z",
    "lastAccessedAt": "2024-01-15T10:30:00.000Z",
    "totalTimeSpent": 1200,
    "lessons": [
      {
        "lessonId": "lessonId",
        "title": "Introduction",
        "completed": true,
        "timeSpent": 30,
        "watchTime": 1800,
        "completedAt": "2024-01-01T01:00:00.000Z"
      }
    ],
    "bookmarks": [...],
    "notes": [...]
  }
}
```

**PUT** `/api/v1/dashboard/progress/:courseId`

- **Purpose**: Update progress for a specific lesson
- **Authentication**: Required
- **Parameters**: courseId (URL parameter)
- **Body**:

```json
{
  "lessonId": "lessonId",
  "completed": true,
  "timeSpent": 30,
  "watchTime": 1800
}
```

**Response**:

```json
{
  "success": true,
  "message": "Progress updated successfully",
  "progress": {
    "completionPercentage": 80,
    "completedLessons": 16,
    "totalLessons": 20,
    "isCompleted": false
  }
}
```

### 8. Legacy Course Dashboard (Maintained for compatibility)

**GET** `/api/v1/course-dashboard`

- **Purpose**: Original course dashboard endpoint
- **Authentication**: Required
- **Note**: Redirects to main dashboard endpoint

## Features

### For Students:

- **Progress Tracking**: Detailed lesson-by-lesson progress tracking
- **Learning Path**: Personalized course recommendations
- **Time Management**: Track time spent on courses and lessons
- **Bookmarks & Notes**: Save important moments and take notes
- **Completion Certificates**: Track completed courses

### For Administrators:

- **Course Analytics**: Detailed enrollment, revenue, and engagement metrics
- **User Management**: Overview of user activity and engagement
- **Trending Data**: Monthly enrollment and revenue trends
- **Review Management**: Monitor and analyze course reviews

### Technical Features:

- **Caching**: Dashboard data cached for 5 minutes for performance
- **Real-time Updates**: Progress updates in real-time
- **Role-based Access**: Different data and permissions based on user role
- **Error Handling**: Comprehensive error handling and validation

## Usage Examples

### Frontend Integration

```javascript
// Get main dashboard data
const dashboard = await fetch("/api/v1/dashboard/", {
  credentials: "include",
}).then((res) => res.json());

// Update course progress
await fetch(`/api/v1/dashboard/progress/${courseId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify({
    lessonId: "lesson123",
    completed: true,
    timeSpent: 30,
  }),
});
```

### Error Responses

All endpoints return standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

Common status codes:

- `401`: Authentication required
- `403`: Insufficient permissions
- `404`: Resource not found
- `500`: Server error

## Data Models

### Course Progress Model

- Tracks individual lesson completion
- Records time spent and watch time
- Maintains bookmarks and notes
- Calculates overall completion percentage

### Dashboard Cache

- Redis-based caching for performance
- 5-minute cache duration
- User-specific cache keys
- Automatic cache invalidation on updates
