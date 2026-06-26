import React, { useState, useEffect } from "react";
import ReportTable from "../components/ReportTable";

export default function RecentMeals({ currentUser }) {
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  // loads meals
  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      setReport(null);
      return;
    }
    fetch(
      `https://backend-production-cd17.up.railway.app/api/reports/recent-meals?userId=${currentUser.id}`,
    )
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
  }, [currentUser]);

  if (error) return <div className="text-center p-5">Error: {error}</div>;

  return <ReportTable report={report} />;
}
