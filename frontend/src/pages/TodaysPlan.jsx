import React, { useState, useEffect } from "react";

export default function TodaysPlan() {
  const [planItems, setPlanItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const mealCategories = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];

  // Fetch today's plan entries
  useEffect(() => {
    fetch("http://localhost:8080/api/plans?userId=1")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load today's plan");
        return res.json();
      })
      .then((data) => {
        setPlanItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/api/plans/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to remove item");
        setPlanItems(planItems.filter((item) => item.id !== id));
      })
      .catch((err) => alert(`Error removing item: ${err.message}`));
  };

  const formatMealType = (type) => {
    if (!type) return "";
    const lower = type.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const totalCalories = planItems.reduce(
    (sum, item) => sum + (item.idea?.calories || 0),
    0,
  );

  if (loading)
    return <div className="text-center p-5">Loading today's plan...</div>;

  return (
    <div className="card">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 gap-4">
        <h1>Today's Plan</h1>
        <h4>Total: {totalCalories} kcal</h4>
      </div>
      {mealCategories.map((category) => {
        const categoryItems = planItems.filter(
          (item) => item.idea?.mealType === category,
        );
        if (categoryItems.length === 0) return null;

        return (
          <div key={category} className="mt-4">
            <h3>{formatMealType(category)}</h3>

            <div className="d-none d-md-block mt-4">
              <table className="table table-hover align-middle">
                <tbody>
                  {categoryItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.idea?.title}</td>
                      <td>{item.idea?.calories} kcal</td>
                      <td className="text-end">
                        <button
                          className="btn btn-green"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile view */}
            <div className="d-md-none mt-4">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded p-3 mb-2 d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>{item.idea?.title}</h5>
                    <p>{item.idea?.calories} kcal</p>
                  </div>
                  <button
                    className="btn btn-green"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ); // return
      })}
    </div>
  ); // return
}
