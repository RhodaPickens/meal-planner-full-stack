import React, { useState, useEffect } from "react";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // data fetch
  useEffect(() => {
    fetch("http://localhost:8080/api/meals?userId=1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch meals");
        }
        return response.json();
      })
      .then((data) => {
        setMeals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading meals:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center p-5">Loading your menu...</div>;
  if (error) return <div className="text-center p-5">Error: {error}</div>;

  return (
    <div className="card">
      <div className="d-flex flex-column align-items-center">
        <h1>Manage Meals</h1>
        <button className="mt-3">Add New Meal</button>
      </div>

      <div className="d-none d-md-block mt-4">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Meal Name</th>
              <th>Calories</th>
              <th>Meal Type</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal.id}>
                <td>{meal.title}</td>
                <td>{meal.calories} kcal</td>
                <td>{meal.mealType}</td>
                <td className="text-end">
                  <button>Edit</button>
                  <button className="btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-md-none">
        {meals.map((meal) => (
          <div key={meal.id} className="border rounded p-3 mb-3 bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <h5>{meal.title}</h5>
              <span>{meal.mealType}</span>
            </div>
            <p>Calories: {meal.calories} kcal</p>
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
