# Abu Rayyan Academy - School Management System

![Abu Rayyan Academy Logo](public/favicon/aburayyan-logo.png)

A comprehensive school management system built with Next.js 14, offering integrated solutions for student management, academic tracking, ICT programs, and administrative operations.

## 🏫 About Abu Rayyan Academy

Abu Rayyan Academy is a private school located in Mombasa, Kenya, offering world-class education with a focus on:
- **CBC (Competency-Based Curriculum)** education
- **ICT Training Programs** including computer literacy and digital skills
- **Islamic Values** integration
- **Character Development** and academic excellence
- **Swimming Programs** for physical development

## 🌟 Key Features

### 🎓 Academic Management
- **Student Information System** - Complete student profiles with academic records
- **Class & Grade Management** - Multi-level class organization (PP1-PP2, Grade 1-9)
- **Subject Management** - Curriculum-based subject organization
- **Exam & Assessment System** - CBC-compliant grading and evaluation
- **Mark Management** - Comprehensive grade tracking with automated calculations

### 👥 User Management
- **Multi-Role Authentication** - Students, Teachers, Guardians, Admins
- **Teacher Management** - Staff profiles with qualifications and responsibilities
- **Guardian System** - Parent/guardian accounts linked to students
- **Role-Based Access Control** - Secure permissions system

### 💻 ICT Programs
- **Course Registration System** - Online enrollment for ICT courses
- **Program Management** - Structured ICT curriculum delivery
- **Session Tracking** - Class attendance and progress monitoring
- **Digital Skills Training** - Preparing students for the digital age

### 📊 Administrative Features
- **Dashboard Analytics** - Real-time school statistics and insights
- **Bulk Operations** - Excel import/export for mass data management
- **File Management** - Document upload and storage system
- **School Configuration** - Multi-school support with custom settings

### 🔒 Security & Authentication
- **NextAuth.js Integration** - Secure authentication system
- **Google OAuth** - Social login support
- **Credential-based Login** - Traditional username/password authentication
- **API Security** - Protected routes with role-based access

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **React Hook Form** - Form management with validation
- **Zustand** - State management
- **Redux Toolkit** - Complex state management

### Backend
- **Next.js API Routes** - Full-stack API endpoints
- **MongoDB** - NoSQL database with Mongoose ODM
- **NextAuth.js** - Authentication system
- **bcryptjs** - Password hashing
- **Nodemailer** - Email notifications

### UI Components
- **Custom Magic Cards** - Interactive UI elements
- **Shimmer Buttons** - Animated buttons
- **Data Tables** - Advanced table components
- **Charts** - Data visualization with Recharts
- **File Upload** - UploadThing integration

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing
- **Git** - Version control

## 📁 Project Structure

```
aburayyan-academy/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/v1/            # API endpoints
│   │   │   ├── student/       # Student CRUD operations
│   │   │   ├── teacher/       # Teacher management
│   │   │   ├── class/         # Class management
│   │   │   ├── subject/       # Subject operations
│   │   │   ├── exam/          # Exam management
│   │   │   └── mark/          # Grade management
│   │   ├── (pages)/           # Public pages
│   │   └── dashboard/         # Protected admin area
│   ├── auth/                  # Authentication logic
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   ├── forms/            # Form components
│   │   ├── tables/           # Data table components
│   │   └── custom/           # Custom components
│   ├── lib/                  # Utility functions
│   ├── models/               # Mongoose schemas
│   ├── store/                # State management
│   └── types/                # TypeScript definitions
├── public/                   # Static assets
│   ├── school/              # School images
│   ├── favicon/             # Favicons
│   └── uploads/             # User uploads
└── docs/                    # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aburayyan-academy.git
   cd aburayyan-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Copy the example environment file and configure:
   ```bash
   cp env.example.txt .env.local
   ```

   Configure the following environment variables:
   ```env
   # Database
   NEXT_PUBLIC_MONGODB_USER=your_mongodb_user
   NEXT_PUBLIC_MONGODB_PWD=your_mongodb_password
   
   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   
   # Google OAuth
   GOOGLE_ID=your_google_oauth_id
   GOOGLE_SECRET=your_google_oauth_secret
   
   # Email Configuration
   NEXT_PUBLIC_EMAIL_USER=your_email@gmail.com
   NEXT_PUBLIC_EMAIL_PWD=your_app_password
   
   # File Upload
   UPLOADTHING_TOKEN=your_uploadthing_token
   
   # Payment Integration (M-Pesa)
   DARAJA_API_CONSUMER_KEY=your_daraja_key
   DARAJA_API_CONSUMER_SECRET=your_daraja_secret
   DARAJA_API_PASS_KEY=your_daraja_passkey
   DARAJA_API_BUSINESS_SHORT_CODE=your_business_code
   DARAJA_API_BASE_URL=https://sandbox.safaricom.co.ke
   
   # Application
   APP_NAME=aburayyan-academy
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `GET /api/auth/session` - Get current session

### Student Management
- `GET /api/v1/student` - List all students
- `POST /api/v1/student` - Create new student
- `GET /api/v1/student/[id]` - Get student by ID
- `PUT /api/v1/student/[id]` - Update student
- `DELETE /api/v1/student/[id]` - Delete student

### Teacher Management
- `GET /api/v1/teacher` - List all teachers
- `POST /api/v1/teacher` - Create new teacher
- `GET /api/v1/teacher/[id]` - Get teacher by ID
- `PUT /api/v1/teacher/[id]` - Update teacher
- `DELETE /api/v1/teacher/[id]` - Delete teacher

### Class Management
- `GET /api/v1/class` - List all classes
- `POST /api/v1/class` - Create new class
- `GET /api/v1/class/[id]` - Get class by ID
- `PUT /api/v1/class/[id]` - Update class
- `DELETE /api/v1/class/[id]` - Delete class

## 🎨 UI Components

### Custom Components
- **MagicCard** - Interactive cards with hover effects
- **ShimmerButton** - Animated buttons with shimmer effects
- **ShineBorder** - Glowing border components
- **DataTables** - Advanced data tables with sorting and filtering
- **FormModal** - Modal dialogs for forms
- **FileUpload** - Drag-and-drop file upload

### Form Components
- **StudentForm** - Student registration and editing
- **TeacherForm** - Teacher profile management
- **ExamForm** - Exam creation and management
- **MarkEntry** - Grade entry interface

## 🔐 Authentication & Authorization

### Supported Authentication Methods
1. **Credentials** - Email/password authentication
2. **Google OAuth** - Social login integration

### User Roles
- **Admin** - Full system access
- **Teacher** - Student and class management
- **Guardian** - View student progress
- **User** - Basic access level

### Role Permissions
```typescript
// Middleware protection for API routes
export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*", "/u-dashboard"],
};
```

## 📊 Database Schema

### Core Models
- **Student** - Student information and academic records
- **Teacher** - Staff profiles and qualifications
- **Class** - Class organization and student enrollment
- **Subject** - Curriculum subjects and categories
- **Exam** - Assessment and examination records
- **Mark** - Grade tracking with CBC compliance
- **User** - Authentication and user management
- **School** - Multi-school configuration

### Relationships
```
School (1) ←→ (N) Students
School (1) ←→ (N) Teachers
School (1) ←→ (N) Classes
Class (1) ←→ (N) Students
Teacher (N) ←→ (N) Subjects
Student (1) ←→ (N) Marks
Guardian (1) ←→ (N) Students
```

## 🎯 Key Features in Detail

### Student Registration Number Generation
Automatic generation of unique student registration numbers:
```
Format: abu/s/YYYY/XXX
Example: abu/s/2024/001
```

### CBC Grading System
Automated grade calculation based on Competency-Based Curriculum:
- **E (Exceeding)** - 80-100%
- **M (Meeting)** - 70-79%
- **A (Approaching)** - 50-69%
- **B (Below)** - 0-49%

### Multi-School Support
The system supports multiple schools with separate configurations and isolated data.

### ICT Program Management
Specialized features for managing ICT training programs including:
- Course registration
- Session scheduling
- Progress tracking
- Certificate generation

## 🚀 Deployment

### Environment Setup
1. Set up production MongoDB database
2. Configure production environment variables
3. Set up file upload service (UploadThing)
4. Configure email service (Gmail/SMTP)

### Deployment Options

#### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Traditional Hosting
```bash
npm run build
npm start
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- Unit tests for utilities and helpers
- Integration tests for API endpoints
- Component tests for UI elements
- End-to-end tests for critical workflows

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use conventional commit messages
3. Ensure all tests pass
4. Update documentation for new features

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Update documentation
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

### School Information
- **Website**: [Abu Rayyan Academy](https://aburayyanacademy.com)
- **Location**: Mombasa, Kenya
- **Phone**: +254 XXX XXX XXX
- **Email**: info@aburayyanacademy.com

### Technical Support
For technical issues and feature requests, please:
1. Check the [Issues](https://github.com/your-username/aburayyan-academy/issues) page
2. Create a new issue with detailed description
3. Contact the development team

## 🔄 Updates & Changelog

### Version 1.0.1 (Current)
- Initial release with core functionality
- Student and teacher management
- ICT program features
- Authentication system
- Dashboard analytics

### Planned Features
- [ ] Mobile application
- [ ] Advanced reporting system
- [ ] Parent portal enhancements
- [ ] SMS notifications
- [ ] Fee management system
- [ ] Library management
- [ ] Transport management

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For hosting and deployment solutions
- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For the utility-first CSS framework
- **MongoDB** - For the flexible database solution

---

**Built with ❤️ for Abu Rayyan Academy - Empowering the next generation through quality education and technology.**
