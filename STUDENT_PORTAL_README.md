# Student Portal System

## Overview

The Student Portal is a secure web application that allows students to access their academic information, view examination results, manage their profiles, and monitor their account activity. The system provides comprehensive authentication, activity tracking, and data visualization features.

## Features

### 🔐 Authentication & Security
- **Dual Login Methods**: Students can login using either their Registration Number (regno) or KAS Number
- **Default Password**: All students start with password "2025" and must change it on first login
- **Session Management**: JWT-based authentication with secure session tracking
- **Account Security**: Failed login attempt tracking, account locking, and password reset functionality
- **Activity Logging**: Comprehensive logging of all student activities for accountability

### 📊 Dashboard & Analytics
- **Personalized Dashboard**: Welcome screen with student information and quick stats
- **Academic Overview**: Total results, average scores, and performance metrics
- **Quick Actions**: Easy navigation to results, profile, and activity sections
- **Recent Activity**: Display of latest examination results and grades

### 📈 Results Management
- **Exam Results**: View detailed examination results with grades and scores
- **Performance Analysis**: Subject-wise performance tracking and grade visualization
- **Filtering & Search**: Filter results by term, year, subject, or exam type
- **Grade Distribution**: Visual representation of academic performance

### 👤 Profile Management
- **Personal Information**: View and edit student details (limited fields)
- **Academic Details**: Class information, registration numbers, and academic status
- **Contact Management**: Update phone numbers and addresses
- **Security Settings**: Password change and account security options

### 📋 Activity Monitoring
- **Login History**: Complete record of all login sessions with timestamps
- **Session Details**: Device information, IP addresses, and session duration
- **Activity Logs**: Detailed tracking of portal usage and actions
- **Security Monitoring**: Failed login attempts and account access patterns

## System Architecture

### Backend Components

#### 1. Models
- **Student Model** (`/src/models/Student.ts`): Enhanced with authentication fields
- **LoginActivity Model** (`/src/models/LoginActivity.ts`): Tracks all student sessions and activities
- **Exam Model**: Existing exam system integration for results

#### 2. Authentication Service
- **StudentAuthService** (`/src/auth/StudentAuthService.ts`): Core authentication logic
  - Student login/logout
  - Session management
  - Activity logging
  - Password verification

#### 3. API Endpoints
- **Authentication APIs** (`/src/app/api/student-auth/`):
  - `POST /api/student-auth/login` - Student login
  - `POST /api/student-auth/logout` - Student logout
  - `POST /api/student-auth/reset-password` - Password reset
  - `GET /api/student-auth/session` - Session verification

- **Portal APIs** (`/src/app/api/student-portal/`):
  - `GET /api/student-portal/results` - Academic results
  - `GET /api/student-portal/profile` - Student profile and activity
  - `PUT /api/student-portal/profile` - Update profile

#### 4. Middleware
- **Student Portal Middleware** (`/src/middleware.ts`): Route protection and session verification

### Frontend Components

#### 1. Pages
- **Login Page** (`/src/app/student-portal/login/page.tsx`): Dual-method authentication form
- **Dashboard** (`/src/app/student-portal/dashboard/page.tsx`): Main overview and navigation
- **Results Page** (`/src/app/student-portal/results/page.tsx`): Academic results with filtering
- **Profile Page** (`/src/app/student-portal/profile/page.tsx`): Personal information management
- **Activity Page** (`/src/app/student-portal/activity/page.tsx`): Session and activity monitoring

#### 2. UI Components
- Built with **shadcn/ui** for consistent design
- **Responsive Design**: Mobile-friendly interface
- **Data Visualization**: Charts and progress indicators
- **Form Handling**: React Hook Form with validation

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB database (local or MongoDB Atlas)
- Environment variables configured

### Environment Configuration

Create a `.env.local` file with the following variables:

```bash
# MongoDB Configuration
NEXT_PUBLIC_MONGODB_USER=your_mongodb_username
NEXT_PUBLIC_MONGODB_PWD=your_mongodb_password

# Application Configuration
APP_NAME=aburayyan-academy
DARAJA_API_APP_NAME=aburayyan-academy

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Development Environment
NODE_ENV=development
```

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Student Passwords**
   ```bash
   npx tsx src/scripts/setup-student-passwords.ts
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access Student Portal**
   - Navigate to: `http://localhost:3000/student-portal/login`
   - Use any student's Registration Number or KAS Number
   - Default password: `2025`

## Usage Guide

### For Students

1. **First Time Login**:
   - Go to `/student-portal/login`
   - Enter your Registration Number OR KAS Number
   - Use password "2025"
   - You'll be prompted to change your password

2. **Dashboard Navigation**:
   - View academic statistics and overview
   - Access quick actions for results, profile, and activity
   - Monitor recent login sessions

3. **Viewing Results**:
   - Click "View Results" from dashboard
   - Filter by term, year, subject, or exam type
   - View detailed grades and performance metrics

4. **Managing Profile**:
   - Update personal contact information
   - View academic details and class information
   - Monitor account activity and security

5. **Activity Monitoring**:
   - View complete login history
   - Monitor session details and device information
   - Track portal usage patterns

### For Administrators

1. **Student Management**:
   - Students are automatically set up with default password "2025"
   - Monitor student activity through login logs
   - Track portal usage and engagement

2. **Security Monitoring**:
   - Review failed login attempts
   - Monitor account access patterns
   - Manage account locks and security issues

## Security Features

### 🛡️ Authentication Security
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **JWT Sessions**: Secure token-based session management
- **Failed Login Protection**: Account locking after multiple failed attempts
- **Session Timeout**: Automatic logout after inactivity

### 📝 Activity Tracking
- **Comprehensive Logging**: All student actions are logged with timestamps
- **Device Tracking**: IP addresses and device information recorded
- **Session Monitoring**: Login/logout times and session duration tracking
- **Accountability**: Complete audit trail for all student activities

### 🔒 Access Control
- **Route Protection**: Middleware-based route security
- **Session Verification**: Token validation for all protected routes
- **Limited Permissions**: Students can only access their own data
- **Data Validation**: Input validation and sanitization

## API Reference

### Authentication Endpoints

#### Login Student
```http
POST /api/student-auth/login
Content-Type: application/json

{
  "identifier": "REG123" | "KAS456",
  "password": "student_password"
}
```

#### Logout Student
```http
POST /api/student-auth/logout
Cookie: student-session=jwt_token
```

#### Reset Password
```http
POST /api/student-auth/reset-password
Cookie: student-session=jwt_token

{
  "currentPassword": "current_password",
  "newPassword": "new_password"
}
```

### Portal Data Endpoints

#### Get Student Results
```http
GET /api/student-portal/results?term=1&year=2024&subject=Math
Cookie: student-session=jwt_token
```

#### Get Student Profile
```http
GET /api/student-portal/profile
Cookie: student-session=jwt_token
```

#### Update Student Profile
```http
PUT /api/student-portal/profile
Cookie: student-session=jwt_token
Content-Type: application/json

{
  "contactDetails": {
    "phone": "new_phone_number"
  },
  "address": {
    "street": "new_street",
    "town": "new_town",
    "county": "new_county"
  }
}
```

## Database Schema

### Student Model Extensions
```typescript
{
  // Existing fields...
  password: String,
  isFirstLogin: Boolean,
  passwordResetRequired: Boolean,
  lastLogin: Date,
  failedLoginAttempts: Number,
  accountLocked: Boolean,
  lockUntil: Date
}
```

### LoginActivity Model
```typescript
{
  studentId: ObjectId,
  loginMethod: "regno" | "kas",
  identifier: String,
  ipAddress: String,
  userAgent: String,
  deviceInfo: String,
  location: String,
  loginTime: Date,
  logoutTime: Date,
  sessionDuration: Number,
  activityLog: [{
    action: String,
    timestamp: Date,
    details: String
  }],
  isActive: Boolean
}
```

## Development Scripts

### Setup Scripts
- **`setup-student-passwords.ts`**: Initialize all students with default password
- **`test-student-portal.ts`**: Test student portal functionality

### Running Scripts
```bash
# Setup student passwords
npx tsx src/scripts/setup-student-passwords.ts

# Test portal functionality
npx tsx src/scripts/test-student-portal.ts
```

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── student-auth/          # Authentication endpoints
│   │   └── student-portal/        # Portal data endpoints
│   └── student-portal/            # Frontend pages
│       ├── login/
│       ├── dashboard/
│       ├── results/
│       ├── profile/
│       └── activity/
├── auth/
│   └── StudentAuthService.ts     # Authentication service
├── models/
│   ├── Student.ts               # Enhanced student model
│   └── LoginActivity.ts         # Activity tracking model
├── middleware.ts                # Route protection
└── scripts/                    # Setup and test scripts
```

## Contributing

1. Follow the existing code style and patterns
2. Add comprehensive error handling
3. Include proper TypeScript types
4. Write descriptive commit messages
5. Test all changes thoroughly

## License

This project is part of the Abu Rayyan Academy system and is proprietary software.

## Support

For technical support or questions about the student portal system, please contact the development team.

---

**Note**: This student portal system provides a secure, comprehensive platform for students to access their academic information while maintaining complete accountability through detailed activity tracking and logging.
