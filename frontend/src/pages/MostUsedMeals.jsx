import React, { useState, useEffect } from "react";
import ReportTable from "../components/ReportTable";

export default function MostUsedMeals() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  // loads meals
  useEffect(() => {
    fetch("http://localhost:8080/api/reports/most-used?userId=1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch report");
        }
        return response.json();
      })
      .then((data) => {
        setReport(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) return <div className="text-center p-5">Error: {error}</div>;

  return <ReportTable report={report} />;
}
