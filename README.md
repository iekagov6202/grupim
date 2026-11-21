# Eagle Customs Grouping — Vercel package

## Package contents
- `index.html`: original UI, connected to the API endpoints.
- `api/analyze.mjs`: reads and groups the uploaded invoice.
- `api/engine.mjs`: workbook parsing, VBA grouping engine and Excel export helper.
- `api/vba-rules.mjs`: 132 ordered rules translated from the supplied `HS6_Group_Advanced` macro.
- `api/export-excel.mjs`: creates a grouped `.xlsx`.
- `api/export-pdf.mjs`: creates an A4 landscape PDF.
- `vercel.json`, `package.json`: Vercel/Node configuration.

## Deploy
1. Extract this ZIP.
2. Upload the extracted project to a GitHub repository (or import the folder using Vercel CLI).
3. In Vercel choose **Add New → Project**, import the repository.
4. Framework preset: **Other**. Build command: leave empty. Output directory: leave empty.
5. Deploy. Vercel installs `xlsx` and `pdfkit` from `package.json`.
6. Open the deployment URL and test with a copy of the invoice.

## Local test
- Install Node.js 20+.
- Run `npm install`
- Run `npx vercel dev` to test API routes locally.

## Important implementation notes
- Source invoice headers were checked: `Sheet1`, tariff code `Tarrif No.` is column J (1-based 10), not K; K is `Preferential Item`.
- VBA logic groups by tariff prefix and rate; the 5-digit and 6-digit modes group by the selected prefix.
- XLSM files are read as workbook data. Export is `.xlsx`; VBA macros are not copied into the exported workbook.
- The supplied macro writes to the active sheet and uses columns B/C/G/H/J/L. The web version creates a grouped result appended below the source rows and returns a separate downloadable workbook.
- Validation skips blank/non-numeric tariff codes and reports their source row numbers. Turn off the validation checkbox to skip that validation gate; malformed codes are still not grouped.
- Vercel Functions have request-size limits (4.5 MB). For larger invoices, add direct-to-Blob upload before production use.
- Before relying on customs declarations, compare representative output rows against the Excel VBA result and have tariff/rate classifications reviewed by a qualified customs specialist. The macro's hard-coded rates are implemented as supplied, not independently verified against current law.


## Verification performed in this delivery
- JavaScript syntax checked with Node.js 22 (`node --check`) for all API and server modules.
- VBA conditions were parsed in original order into 132 ordered tariff rules.
- Uploaded workbook structure checked: `Sheet1`, 262 used rows, tariff field in column J.
- Full live deployment/integration test is not claimed here; install dependencies and test the deployed endpoints with a duplicate invoice before operational use.
