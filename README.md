# Clinical Trials Explorer

Skeleton Next.js dùng ClinicalTrials.gov API v2.

## Chạy local

```bash
npm install
copy .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`. API được gọi qua các route nội bộ:

- `GET /api/studies?query=cancer&status=RECRUITING&country=US&phase=PHASE2`
- `GET /api/studies/NCT00000000`

## Cấu trúc chính

```text
src/
  app/                 # App Router, pages và route handlers
    api/studies/       # Proxy/validation cho ClinicalTrials.gov
  components/          # UI theo feature
  lib/                 # API client và business helpers
  types/               # Kiểu dữ liệu upstream
```

ClinicalTrials.gov phân trang bằng `nextPageToken`, không phải page number. Lưu token theo bộ query trong React Query khi bổ sung nút “Trang tiếp”.
