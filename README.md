# Diversio Engineer I Exercise — HRIS Import Preview Frontend

React frontend for the Diversio Engineer I HRIS Import Preview exercise.

The application provides a simple browser interface for selecting an HRIS CSV, uploading it to the Django backend, and displaying the resulting import preview.

## Tech Stack

- React 19
- TypeScript
- Vite
- Axios
- oxlint

## Project Structure

```text
diversiofrontend/
├── public/
├── src/
│   ├── api.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

### Responsibilities

`src/App.tsx` contains the upload interaction and import-preview UI.

`src/api.ts` contains the Axios client and CSV upload request to the Django backend.

## Requirements

- Node.js
- npm

## Setup

From the frontend directory:

```bash
npm install
```

## Run the Development Server

```bash
npm run dev
```

Vite will print the local development URL, normally:

```text
http://localhost:5173/
```

The Django backend must also be running for CSV uploads to work.

## Run the Full Application

Start the backend first:

```bash
cd DiversioBackend
python manage.py runserver
```

Then, in a second terminal:

```bash
cd diversiofrontend
npm install
npm run dev
```

Open the Vite URL in a browser.


## Using the Application

1. Open the application in a browser.(http://localhost:5173/)
2. Select a `.csv` file.
3. Click **Upload CSV**.
4. Wait for the backend to process the file.

The interface displays:

- selected file name;
- upload/loading state;
- upload errors;
- total source rows;
- accepted rows;
- invalid rows and source row numbers;
- root employees;
- manager direct-report counts;
- manager errors;
- cyclic employees.

## Backend API

The frontend uses Axios to call the Django endpoint:

```http
POST http://127.0.0.1:8000/admin/csv-parser
```

The CSV is sent as multipart form data using the field name `file`.

The backend is a separate project. See the backend README for API details, CSV rules, validation, hierarchy analysis, and tests.

## Available Commands

### Development

```bash
npm run dev
```

## Error Handling

The UI prevents an upload when no file has been selected and displays an error when the upload request fails.

The backend is responsible for validating the CSV and returning validation/processing errors. The frontend displays the backend response as the import preview.

## Configuration

The backend URL is currently defined directly in `src/api.ts`:

```text
http://127.0.0.1:8000
```

For a production application, this would be moved to an environment variable so that development, test, and production environments can use different API URLs.

## Assumptions and Known Limitations

- The frontend expects the Django backend to be available at `http://127.0.0.1:8000` during local development.
- The application is intentionally simple because the exercise prioritizes functionality and clarity over visual polish.
- The frontend does not persist imported employee data.
- API response data is currently represented with flexible TypeScript values rather than a complete typed API response model.
- More UI-level tests could be added with additional development time.

## AI Usage

AI tools were used as development assistance during the exercise. I remained responsible for reviewing, understanding, testing, and validating the resulting code.

- **ChatGPT** and **AI Studio**: Used for generating initial scaffold

## Time Spent

Approximate implementation time: **~25 - 40** minutes.

## Related Backend

The CSV parsing and hierarchy analysis are implemented in the separate `DiversioBackend` Django project. See its README for backend setup and API details.
