# Template Upload Feature

This feature allows teachers and administrators to upload educational templates and resources that students can download.

## Features

### 1. Template Upload (Dashboard)
- **Location**: `/dashboard/templates`
- **Access**: Admin and Teacher roles
- **Functionality**:
  - Upload files (PDF, DOC, DOCX, XLSX, PPT, PPTX, TXT)
  - Categorize templates (Exam, Assignment, Worksheet, Lesson Plan, Other)
  - Associate with specific grades/classes
  - Add metadata (title, description, subject, tags)
  - Track download statistics

### 2. Template Download (Public)
- **Location**: `/downloads-templates-enhanced`
- **Access**: Students and public
- **Functionality**:
  - Two tabs: Generated Templates and Educational Resources
  - **Generated Templates**: Personalized exam templates (Excel/Word)
  - **Educational Resources**: Browse and download uploaded templates
  - Advanced filtering and search capabilities

## File Structure

```
src/
├── app/
│   ├── api/v1/templates/
│   │   ├── route.ts                    # GET/POST templates
│   │   ├── [id]/
│   │   │   ├── route.ts               # GET/PUT/DELETE specific template
│   │   │   └── download/
│   │   │       └── route.ts           # Download template file
│   ├── (pages)/dashboard/templates/
│   │   └── page.tsx                   # Template management dashboard
│   └── downloads-templates-enhanced/
│       └── page.tsx                   # Enhanced download page
├── models/
│   └── Template.ts                    # Template database model
```

## API Endpoints

### Templates API (`/api/v1/templates`)

#### GET - List Templates
- **Query Parameters**:
  - `grade`: Filter by grade
  - `category`: Filter by category
  - `subject`: Filter by subject
  - `search`: Search in title, description, tags
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20)

#### POST - Create Template
- **Body**: Template metadata + file upload
- **Authentication**: Required
- **Permissions**: Admin, Teacher

#### GET `/api/v1/templates/[id]` - Get Single Template
- **Response**: Template details

#### PUT `/api/v1/templates/[id]` - Update Template
- **Body**: Updated template metadata
- **Authentication**: Required
- **Permissions**: Admin or template owner

#### DELETE `/api/v1/templates/[id]` - Delete Template
- **Action**: Soft delete (sets isActive: false)
- **Authentication**: Required
- **Permissions**: Admin or template owner

#### GET `/api/v1/templates/[id]/download` - Download Template
- **Response**: File binary data
- **Action**: Increments download counter

## Database Schema

```typescript
interface ITemplate {
  title: string;
  description?: string;
  fileName: string;
  filePath: string;
  fileType: 'pdf' | 'doc' | 'docx' | 'xlsx' | 'ppt' | 'pptx' | 'txt' | 'other';
  fileSize: number;
  grade: string;
  subject?: string;
  category: 'exam' | 'assignment' | 'worksheet' | 'lesson-plan' | 'other';
  uploadedBy: {
    userId: string;
    userName: string;
    userRole: string;
  };
  isActive: boolean;
  downloadCount: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

## Usage Examples

### 1. Upload a Template (Dashboard)
1. Navigate to `/dashboard/templates`
2. Click "Upload Template"
3. Fill in the form:
   - Title: "Grade 1 Math Exam"
   - Grade: "Grade 1"
   - Category: "Exam"
   - Subject: "Mathematics"
   - Description: "Basic addition and subtraction exercises"
   - Tags: "math, basic, arithmetic"
4. Select file and upload

### 2. Download Templates (Student)
1. Navigate to `/downloads-templates-enhanced`
2. Choose between:
   - **Generated Templates**: Select student name → Download personalized template
   - **Educational Resources**: Browse/search → Download uploaded files

### 3. Filter Templates
- Search by keywords
- Filter by grade, category, subject
- Sort by upload date, download count

## File Upload Process

1. **File Upload**: Uses existing `/api/v1/upload` endpoint
2. **Template Creation**: Stores metadata in database
3. **File Storage**: Files stored in `public/uploads/` directory
4. **Download**: Serves files with proper headers and tracking

## Security Features

- **Authentication**: Required for upload/edit/delete
- **Authorization**: Role-based permissions
- **File Validation**: Type and size restrictions
- **Soft Delete**: Maintains data integrity
- **Access Control**: Public download, protected management

## Future Enhancements

- [ ] Template categories management
- [ ] Bulk upload functionality
- [ ] Template versioning
- [ ] Advanced analytics dashboard
- [ ] Email notifications for new uploads
- [ ] Template approval workflow
- [ ] Integration with learning management system

## Installation & Setup

1. The feature is automatically available when the application runs
2. Make sure the uploads directory exists: `public/uploads/`
3. Configure file upload limits in your server settings
4. Ensure proper database indexes are created (done automatically)

## Testing

1. **Upload Test**: Try uploading different file types
2. **Download Test**: Verify files download correctly
3. **Permission Test**: Check role-based access control
4. **Search Test**: Test filtering and search functionality
5. **Statistics Test**: Verify download counters work

This feature provides a complete solution for educational resource management and distribution within the Abu Rayyan Academy system.
