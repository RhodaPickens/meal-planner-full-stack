import React from "react";

export default function ReportTable({ report }) {
  if (!report) return <div className="text-center p-5">Loading report...</div>;

  return (
    <div className="card card-wide">
      <div className="d-flex flex-column align-items-center">
        <h1>{report.title}</h1>
        <p>
          Report generated on: {new Date(report.generatedAt).toLocaleString()}
        </p>
      </div>

      {/* Desktop Table */}
      <div className="d-none d-md-block mt-4">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              {report.columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {report.reportData?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="d-md-none mt-4">
        {report.reportData?.map((row, rowIndex) => (
          <div key={rowIndex} className="border rounded p-3 mb-3 bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <h5>{row[0]}</h5>
              <span>{row[1]} uses</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
