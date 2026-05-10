<<<<<<< HEAD
# ABC-Pharmacy
Repository for pharmacy assignment
=======
# ABC Pharmacy

A Single Page Application for managing medicine inventory and sales records.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (Vite) |
| Backend | ASP.NET Core 8 Web API |
| Storage | JSON files (server-side) |

## Features

- View medicine inventory in a grid
  - Red row — expiry date within 30 days
  - Yellow row — stock quantity less than 10
  - Search by medicine name
- Add new medicines
- Record sales (deducts stock automatically)
- View full sales history

## Project Structure

```
ABC Pharmacy/
├── AbcPharmacy.Api/              # .NET Core Web API
│   ├── Controllers/
│   │   ├── MedicinesController.cs
│   │   └── SalesController.cs
│   ├── Managers/
│   │   ├── Medicines/
│   │   │   ├── IMedicineManager.cs
│   │   │   └── MedicineManager.cs
│   │   └── Sales/
│   │       ├── ISaleManager.cs
│   │       └── SaleManager.cs
│   ├── Models/
│   │   ├── Medicine.cs
│   │   ├── SaleRecord.cs
│   │   └── SaleRequest.cs
│   ├── Services/
│   │   ├── IJsonStorageService.cs
│   │   └── JsonStorageService.cs
│   ├── Data/
│   │   ├── medicines.json        # medicine data store
│   │   └── sales.json            # sales data store
│   └── Program.cs
│
└── abc-pharmacy-ui/              # React frontend
    └── src/
        ├── api.js                # all API fetch calls
        ├── App.jsx               # tab navigation shell
        └── components/
            ├── MedicineGrid.jsx  # inventory grid with colour coding and search
            ├── AddMedicineForm.jsx
            └── SalesPanel.jsx
```

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js v18+](https://nodejs.org)

### Run the API

```bash
cd AbcPharmacy.Api
dotnet run --launch-profile http
```

API runs on `http://localhost:5284`

### Run the Frontend

```bash
cd abc-pharmacy-ui
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

Open [http://localhost:5173](http://localhost:5173) in your browser.

> The Vite dev server proxies all `/api` requests to the backend, so no CORS configuration is needed during development.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/medicines` | Get all medicines |
| POST | `/api/medicines` | Add a new medicine |
| GET | `/api/sales` | Get all sale records |
| POST | `/api/sales` | Record a sale |

### Medicine object

```json
{
  "fullName": "Paracetamol",
  "brand": "Calpol",
  "expiryDate": "2026-12-31",
  "quantity": 50,
  "price": 12.50,
  "notes": "Optional notes"
}
```

### Record a sale

```json
{
  "medicineId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "quantitySold": 5
}
```

## Architecture

```
Controllers  →  Managers  →  Services
  (HTTP)        (logic)      (data)
```

- **Controllers** — handle HTTP request/response only
- **Managers** — business logic (stock validation, sale calculation)
- **Services** — read/write JSON files via `IJsonStorageService`

All layers are wired via interfaces for dependency injection, registered in `Program.cs`.
>>>>>>> master
