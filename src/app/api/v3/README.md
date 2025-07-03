# API v3 Documentation - Nested Resource Structure

## Overview
This API uses a hierarchical nested structure that clearly shows the relationship between resources:
- **Exams** contain **Testing Areas**
- **Testing Areas** contain **Marks**

The URL structure reflects this hierarchy making it more intuitive and RESTful.

## Base URL
`/api/v3`

---

## 🎯 Key Advantages over v2:

### **1. More Intuitive URLs**
```bash
# v2 (flat structure)
POST /api/v2/testing-area          # Need to pass examId in body
GET  /api/v2/mark?examId=123&testingAreaId=456

# v3 (nested structure)  
POST /api/v3/exam/123/testing-area # examId is in the URL
GET  /api/v3/exam/123/mark?testingAreaId=456
```

### **2. Clear Resource Hierarchy**
- `/api/v3/exam` - Exam management
- `/api/v3/exam/{id}/testing-area` - Testing areas within a specific exam
- `/api/v3/exam/{id}/mark` - Marks within a specific exam

### **3. Better REST Compliance**
URLs now represent the actual resource relationships in the data model.

---

## 1. Exams API (`/api/v3/exam`)

### Create Exam
**POST** `/api/v3/exam`

**Single Exam:**
```json
{
  "name": "Mid-Term Exam",
  "term": 2,
  "year": 2025,
  "school": "60f1b2e4c8d4f12a3c5e6789"
}
```

**Multiple Exams:**
```json
[
  {
    "name": "Mid-Term Exam",
    "term": 2,
    "year": 2025,
    "school": "60f1b2e4c8d4f12a3c5e6789"
  },
  {
    "name": "Final Exam", 
    "term": 3,
    "year": 2025,
    "school": "60f1b2e4c8d4f12a3c5e6789"
  }
]
```

**Note:** If `school` is not provided, it will be automatically assigned to the first school found in the database.

### Get All Exams
**GET** `/api/v3/exam?school=60f1b2e4c8d4f12a3c5e6789&term=2&year=2025&page=1&limit=10&search=midterm&sortBy=name&sortOrder=asc`

**Query Parameters:**
- `school` - Filter by school ID
- `term` - Filter by term (1, 2, or 3)
- `year` - Filter by year
- `page` - Page number for pagination (default: 1)
- `limit` - Number of results per page (default: 10)
- `search` - Search in name, year, or term fields
- `sortBy` - Sort by field (default: "createdAt")
- `sortOrder` - Sort order: "asc" or "desc" (default: "desc")

**Response:**
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Get Exam by ID
**GET** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789`

### Update Exam
**PUT** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789`
```json
{
  "name": "Updated Exam Name",
  "term": 3
}
```

### Delete Exam
**DELETE** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789`

---

## 2. Testing Areas API (`/api/v3/exam/{examId}/testing-area`)

### Create Testing Area
**POST** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/testing-area`
```json
{
  "name": "Mathematics - Grade 5",
  "subject": "60f1b2e4c8d4f12a3c5e6790",
  "class": "60f1b2e4c8d4f12a3c5e6791",
  "teacher": "60f1b2e4c8d4f12a3c5e6792",
  "dueDate": "2025-07-15T09:00:00Z",
  "outOf": 100,
  "invigilators": ["60f1b2e4c8d4f12a3c5e6793"]
}
```

### Get Testing Areas for Exam
**GET** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/testing-area?status=PENDING&subject=60f1b2e4c8d4f12a3c5e6790`

### Update Testing Area
**PUT** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/testing-area`
```json
{
  "testingAreaId": "60f1b2e4c8d4f12a3c5e6795",
  "status": "DONE",
  "dateDone": "2025-07-15T11:30:00Z",
  "outOf": 80
}
```

### Delete Testing Area
**DELETE** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/testing-area?testingAreaId=60f1b2e4c8d4f12a3c5e6795`

---

## 3. Marks API - Two Approaches

### Option A: Marks within Exam (`/api/v3/exam/{examId}/mark`)
*Less nested, requires testingAreaId in request body/query*

#### Add Single Mark
**POST** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/mark`
```json
{
  "testingAreaId": "60f1b2e4c8d4f12a3c5e6795",
  "student": "60f1b2e4c8d4f12a3c5e6796",
  "score": 85,
  "remark": "Excellent work"
}
```

#### Bulk Add Marks
**PATCH** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/mark`
```json
{
  "testingAreaId": "60f1b2e4c8d4f12a3c5e6795",
  "marks": [
    {
      "student": "60f1b2e4c8d4f12a3c5e6796",
      "score": 85,
      "remark": "Excellent"
    },
    {
      "student": "60f1b2e4c8d4f12a3c5e6797",
      "score": 72,
      "remark": "Good work"
    }
  ]
}
```

#### Get Marks for Exam
**GET** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/mark?testingAreaId=60f1b2e4c8d4f12a3c5e6795&studentId=60f1b2e4c8d4f12a3c5e6796`

#### Update Mark
**PUT** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/mark`
```json
{
  "testingAreaId": "60f1b2e4c8d4f12a3c5e6795",
  "markId": "60f1b2e4c8d4f12a3c5e6798",
  "score": 90,
  "remark": "Outstanding performance"
}
```

#### Delete Mark
**DELETE** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/mark?testingAreaId=60f1b2e4c8d4f12a3c5e6795&markId=60f1b2e4c8d4f12a3c5e6798`

---

### Option B: Fully Nested Marks (`/api/v3/exam/{examId}/testing-area/{testingAreaId}/mark`) ⭐ **RECOMMENDED**
*Most intuitive and RESTful approach - URL structure reflects exact data hierarchy*

#### Get All Marks for Testing Area
**GET** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/testing-area/60f1b2e4c8d4f12a3c5e6795/mark?studentId=60f1b2e4c8d4f12a3c5e6796`

#### Add Single Mark
**POST** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/testing-area/60f1b2e4c8d4f12a3c5e6795/mark`
```json
{
  "student": "60f1b2e4c8d4f12a3c5e6796",
  "score": 85,
  "remark": "Excellent work"
}
```

#### Bulk Add Marks
**PATCH** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/testing-area/60f1b2e4c8d4f12a3c5e6795/mark`
```json
{
  "marks": [
    {
      "student": "60f1b2e4c8d4f12a3c5e6796",
      "score": 85,
      "remark": "Excellent"
    },
    {
      "student": "60f1b2e4c8d4f12a3c5e6797",
      "score": 72,
      "remark": "Good work"
    }
  ]
}
```

#### Get Specific Mark
**GET** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/testing-area/60f1b2e4c8d4f12a3c5e6795/mark/60f1b2e4c8d4f12a3c5e6798`

#### Update Specific Mark
**PUT** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/testing-area/60f1b2e4c8d4f12a3c5e6795/mark/60f1b2e4c8d4f12a3c5e6798`
```json
{
  "score": 90,
  "remark": "Outstanding improvement"
}
```

#### Delete Specific Mark
**DELETE** `/api/v3/exam/60f1b2e4c8d4f12a3c5e6789/testing-area/60f1b2e4c8d4f12a3c5e6795/mark/60f1b2e4c8d4f12a3c5e6798`

#### 🌟 **Why Option B (Fully Nested) is Better:**
- **Self-documenting URLs**: The path clearly shows `exam → testing-area → mark` hierarchy
- **No parameter confusion**: examId and testingAreaId are in the URL, not request body
- **Perfect REST compliance**: Each resource has its proper place in the hierarchy
- **Type safety**: Impossible to accidentally reference wrong exam/testing area
- **Cleaner payloads**: Request bodies only contain the actual mark data

---

## 🚀 Workflow Examples

### Option A: Using Less Nested Structure
1. **Create an Exam**:
   ```bash
   POST /api/v3/exam
   ```

2. **Add Testing Areas to the Exam**:
   ```bash
   POST /api/v3/exam/{examId}/testing-area
   ```

3. **Add Marks to Testing Areas**:
   ```bash
   POST /api/v3/exam/{examId}/mark (individual)
   # OR
   PATCH /api/v3/exam/{examId}/mark (bulk)
   ```

### Option B: Using Fully Nested Structure ⭐ **RECOMMENDED**
1. **Create an Exam**:
   ```bash
   POST /api/v3/exam
   ```

2. **Add Testing Areas to the Exam**:
   ```bash
   POST /api/v3/exam/{examId}/testing-area
   ```

3. **Add Marks to Specific Testing Area**:
   ```bash
   # Individual mark
   POST /api/v3/exam/{examId}/testing-area/{testingAreaId}/mark
   
   # Bulk marks
   PATCH /api/v3/exam/{examId}/testing-area/{testingAreaId}/mark
   ```

4. **Work with Specific Marks**:
   ```bash
   # Get specific mark
   GET /api/v3/exam/{examId}/testing-area/{testingAreaId}/mark/{markId}
   
   # Update specific mark
   PUT /api/v3/exam/{examId}/testing-area/{testingAreaId}/mark/{markId}
   
   # Delete specific mark
   DELETE /api/v3/exam/{examId}/testing-area/{testingAreaId}/mark/{markId}
   ```

5. **Update Testing Area Status**:
   ```bash
   PUT /api/v3/exam/{examId}/testing-area
   ```

## ✨ Benefits of v3 over v2

| Aspect | v2 | v3 Option A | v3 Option B (Fully Nested) |
|--------|----|----|----| 
| **URL Structure** | Flat (separate resources) | Partially nested | Fully nested hierarchy |
| **examId passing** | In request body | In URL path | In URL path |
| **testingAreaId passing** | In request body | In request body/query | In URL path |
| **Resource clarity** | Need to know relationships | URLs show some relationships | URLs show all relationships |
| **REST compliance** | Good | Very Good | Excellent |
| **Developer experience** | More parameters to remember | Moderate parameters | Intuitive URL structure |
| **API discoverability** | Moderate | Good | Excellent |
| **Type safety** | Manual validation needed | Some validation | Built-in URL validation |

## 🎯 Recommendation

**Use Option B (Fully Nested) for the best experience!** 

The fully nested structure (`/api/v3/exam/{examId}/testing-area/{testingAreaId}/mark/{markId}`) makes it immediately clear that:
- Testing areas belong to specific exams
- Marks belong to specific testing areas within specific exams  
- The hierarchy is evident from the URL alone
- No confusion about which IDs go where

### 🔥 **Real-world Example:**
```bash
# Crystal clear what this does - get all marks for Math exam in Grade 5
GET /api/v3/exam/math-midterm-2025/testing-area/grade5-mathematics/mark

# vs the old way (v2) - requires knowing the relationships
GET /api/v2/mark?examId=math-midterm-2025&testingAreaId=grade5-mathematics
```

This approach is more RESTful and provides the best developer experience.
