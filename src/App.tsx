import { useState } from "react";
import { uploadCsv } from "./api";
import "./App.css";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const data = await uploadCsv(file);

      setResult(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to upload CSV.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="app">
        <h1>HRIS Import Preview</h1>

        <div className="upload-section">
          <input
              type="file"
              accept=".csv"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setError("");
              }}
          />

          <button
              onClick={handleUpload}
              disabled={!file || loading}
          >
            {loading ? "Uploading..." : "Upload CSV"}
          </button>
        </div>

        {file && <p>Selected: {file.name}</p>}

        {error && <p className="error">{error}</p>}

        {result && (
            <div className="results">
              <h2>Import Preview</h2>

              <div className="summary">
                <div>
                  <strong>{result.total_rows}</strong>
                  <span>Total Rows</span>
                </div>

                <div>
                  <strong>{result.accepted_rows?.length ?? 0}</strong>
                  <span>Accepted</span>
                </div>

                <div>
                  <strong>{result.invalid_rows?.length ?? 0}</strong>
                  <span>Invalid</span>
                </div>
              </div>
              <h3>Invalid Entries</h3>


              {result.invalid_rows?.map((item: any, index: number) => (
                  <div key={index}>
                    <p>
                      Row {item.row_number}: {item.errors.join(", ")}
                    </p>
                  </div>
              ))}
              <h3>Root Employees</h3>

              {result.root_employees?.map((employee: any) => (
                  <p key={employee.employee_id}>
                    {employee.employee_name} ({employee.employee_id})
                  </p>
              ))}

              <h3>Manager Report Counts</h3>

              {Object.entries(result.manager_report_counts ?? {}).map(
                  ([manager, count]) => (
                      <p key={manager}>
                        {manager}: {String(count)} reports
                      </p>
                  ),
              )}

              <h3>Manager Errors</h3>

              {result.manager_errors?.map(
                  (item: any, index: number) => (
                      <p key={index}>
                        Row {item.row_number}: {item.error}
                      </p>
                  ),
              )}



              <h3>Cyclic Employees</h3>

              {result.cyclic_employees?.map(
                  (employee: string) => (
                      <p key={employee}>{employee}</p>
                  ),
              )}
            </div>
        )}
      </div>
  );
}

export default App;