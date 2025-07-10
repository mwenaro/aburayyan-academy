# API v2 Documentation

## Overview
This API follows a modular approach where:
- **Exams** are created without testing areas
- **Testing Areas** are added to exams separately
- **Marks** are added to testing areas individually or in bulk

## Base URL
`/api/v2`

---

## 1. Exams API (`/api/v2/exams`)

### Create Exam
**POST** `/api/v2/exams`
```json
{
  "name": "Mid-Term Exam",
  "term": 2,
  "year": 2025,
  "school": "60f1b2e4c8d4f12a3c5e6789"
}
```

### Get All Exams
**GET** `/api/v2/exams?school=60f1b2e4c8d4f12a3c5e6789&term=2&year=2025`

### Get Exam by ID
**GET** `/api/v2/exams/60f1b2e4c8d4f12a3c5e6789`

### Update Exam
**PUT** `/api/v2/exams/60f1b2e4c8d4f12a3c5e6789`
```json
{
  "name": "Updated Exam Name",
  "term": 3
}
```

### Delete Exam
**DELETE** `/api/v2/exams/60f1b2e4c8d4f12a3c5e6789`

---

## 2. Testing Areas API (`/api/v2/testing-area`)

### Create Testing Area
**POST** `/api/v2/testing-area`
```json
{
  "examId": "60f1b2e4c8d4f12a3c5e6789",
  "name": "Mathematics - Grade 5",
  "subject": "60f1b2e4c8d4f12a3c5e6790",
  "class": "60f1b2e4c8d4f12a3c5e6791",
  "teacher": "60f1b2e4c8d4f12a3c5e6792",
  "dueDate": "2025-07-15T09:00:00Z",
  "outOf": 100,
  "invigilators": ["60f1b2e4c8d4f12a3c5e6793", "60f1b2e4c8d4f12a3c5e6794"]
}
```

### Get Testing Areas
**GET** `/api/v2/testing-area?examId=60f1b2e4c8d4f12a3c5e6789&status=PENDING&subject=60f1b2e4c8d4f12a3c5e6790`

### Get Testing Area by ID
**GET** `/api/v2/testing-area/60f1b2e4c8d4f12a3c5e6795?examId=60f1b2e4c8d4f12a3c5e6789`

### Update Testing Area
**PUT** `/api/v2/testing-area/60f1b2e4c8d4f12a3c5e6795`
```json
{
  "examId": "60f1b2e4c8d4f12a3c5e6789",
  "status": "DONE",
  "dateDone": "2025-07-15T11:30:00Z",
  "outOf": 80
}
```

### Delete Testing Area
**DELETE** `/api/v2/testing-area/60f1b2e4c8d4f12a3c5e6795?examId=60f1b2e4c8d4f12a3c5e6789`

---

## 3. Marks API (`/api/v2/mark`)

### Add Single Mark
**POST** `/api/v2/mark`
```json
{
  "examId": "60f1b2e4c8d4f12a3c5e6789",
  "testingAreaId": "60f1b2e4c8d4f12a3c5e6795",
  "student": "60f1b2e4c8d4f12a3c5e6796",
  "score": 85,
  "remark": "Excellent work"
}
```

### Bulk Add Marks
**PATCH** `/api/v2/mark`
```json
{
  "examId": "60f1b2e4c8d4f12a3c5e6789",
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

### Get Marks
**GET** `/api/v2/mark?examId=60f1b2e4c8d4f12a3c5e6789&testingAreaId=60f1b2e4c8d4f12a3c5e6795&studentId=60f1b2e4c8d4f12a3c5e6796`

### Get Mark by ID
**GET** `/api/v2/mark/60f1b2e4c8d4f12a3c5e6798?examId=60f1b2e4c8d4f12a3c5e6789&testingAreaId=60f1b2e4c8d4f12a3c5e6795`

### Update Mark
**PUT** `/api/v2/mark/60f1b2e4c8d4f12a3c5e6798`
```json
{
  "examId": "60f1b2e4c8d4f12a3c5e6789",
  "testingAreaId": "60f1b2e4c8d4f12a3c5e6795",
  "score": 90,
  "remark": "Outstanding performance"
}
```

### Delete Mark
**DELETE** `/api/v2/mark/60f1b2e4c8d4f12a3c5e6798?examId=60f1b2e4c8d4f12a3c5e6789&testingAreaId=60f1b2e4c8d4f12a3c5e6795`

---

## Workflow Example

1. **Create an Exam**:
   ```bash
   POST /api/v2/exams
   ```

2. **Add Testing Areas**:
   ```bash
   POST /api/v2/testing-area
   ```

3. **Add Marks**:
   ```bash
   POST /api/v2/mark (individual)
   # OR
   PATCH /api/v2/mark (bulk)
   ```

4. **Update Testing Area Status**:
   ```bash
   PUT /api/v2/testing-area/{id}
   ```

## Features
- ✅ Auto-generated IDs for all subdocuments
- ✅ Auto-calculated CBC grades
- ✅ Auto-set completion dates
- ✅ Comprehensive error handling
- ✅ Query filtering and population
- ✅ Bulk operations support
- ✅ Validation and conflict prevention
