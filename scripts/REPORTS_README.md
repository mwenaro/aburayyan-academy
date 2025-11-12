This script generates class reports (one per sheet/exam) from the workbook in `doc/`.

What it does
- Reads `doc/WEEKLY ASSESMENTS MARKLIST TEMPLATE-Grade 6 - assessment 2.xlsx`.
- For each sheet it heuristically finds the header row and student rows.
- Produces an Excel file and a CSV in `doc/reports/` containing:
  - `Marks` sheet with the student rows
  - `Summary` sheet with basic statistics for numeric columns (count, sum, avg, min, max)

Assumptions
- The workbook's sheet has one header row (within the first 10 rows). The header row contains tokens like `Name`, `Marks`, `Grade` etc.
- Numeric columns representing marks are numeric-like in at least ~30% of rows.

How to run
1. Install the dependency (run in WSL):

```bash
npm install xlsx
```

2. Run the generator (in WSL):

```bash
node scripts/generate_class_reports.js
```

Outputs
- `doc/reports/<exam-name>.xlsx`
- `doc/reports/<exam-name>.csv`

If you want PDF output or more precise formatting to match a specific template, tell me the exact layout (you can attach screenshots or export the two example sheets as CSV/JSON) and I'll update the script to match the template exactly.
