import React, { useState, useEffect } from "react";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // form logic
  const [showForm, setShowForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);

  // form inputs
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState("Breakfast");

  // format enum to lowercase
  const formatMealType = (type) => {
    if (!type) return "";
    const lower = type.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  // loads meals
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

  // Form handlers
  const handleAddNewClick = () => {
    setEditingMeal(null);
    setTitle("");
    setCalories("");
    setMealType("Breakfast");
    setShowForm(true);
  };

  const handleEditClick = (meal) => {
    setEditingMeal(meal);
    setTitle(meal.title);
    setCalories(meal.calories);
    setMealType(meal.mealType || "Breakfast");
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMeal(null);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const mealData = { title, calories: Number(calories), mealType };

    if (editingMeal) {
      fetch(`http://localhost:8080/api/meals/${editingMeal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mealData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Oops couldn't update meal");
          return response.json();
        })
        .then((updatedMeal) => {
          setMeals(
            meals.map((m) => (m.id === editingMeal.id ? updatedMeal : m)),
          );
          handleCancel();
        })
        .catch((err) => alert(`couldn't update meal: ${err.message}`));
    } else {
      fetch("http://localhost:8080/api/meals?userId=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mealData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("couldn't save new meal");
          return response.json();
        })
        .then((newMealFromServer) => {
          setMeals([...meals, newMealFromServer]);
          handleCancel();
        })
        .catch((err) => alert(`Oops couldn't save: ${err.message}`));
    }
  };

  const handleDeleteClick = (mealId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meal?",
    );

    if (confirmDelete) {
      fetch(`http://localhost:8080/api/meals/${mealId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Oops couldn't delete");
          setMeals(meals.filter((meal) => meal.id != mealId));
        })
        .catch((err) => alert(`couldn't delete meal: ${err.message}`));
    }
  };

  if (loading)
    return <div className="text-center p-5">Loading your menu...</div>;
  if (error) return <div className="text-center p-5">Error: {error}</div>;

  return (
    <div className="card card-wide">
      <div className="d-flex flex-column align-items-center">
        <h1>Manage Meals</h1>
        {!showForm && (
          <button className="mt-3" onClick={handleAddNewClick}>
            Add New Meal
          </button>
        )}
      </div>

      {/* Add New Meal Form */}
      {showForm && (
        <form onSubmit={handleSave} className="snack-form mt-4 p-3 rounded">
          <h3>{editingMeal ? "Edit Meal" : "Add New Meal"}</h3>

          <div className="form-group">
            <label>Enter meal description:</label>
            <input
              className="input-box"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Estimated calories:</label>
            <input
              className="input-box"
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Meal Type</label>
            <select
              className="input-box"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              required
            >
              <option value="BREAKFAST">Breakfast</option>
              <option value="LUNCH">Lunch</option>
              <option value="DINNER">Dinner</option>
              <option value="SNACK">Snack</option>
            </select>
          </div>

          <div className="d-flex justify-content-center gap-2">
            <button type="submit" className="btn btn-green">
              {editingMeal ? "Update Meal" : "Save Meal"}
            </button>
            <button
              type="button"
              className="btn btn-green"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Desktop Manage Meals Table */}
      <div className="d-none d-md-block mt-4">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Meal Name</th>
              <th>Calories</th>
              <th>Meal Type</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal.id}>
                <td>{meal.title}</td>
                <td>{meal.calories} kcal</td>
                <td>{formatMealType(meal.mealType)}</td>
                <td className="text-end d-flex gap-2">
                  <button
                    className="btn btn-green"
                    onClick={() => handleEditClick(meal)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-green"
                    onClick={() => handleDeleteClick(meal.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="d-md-none mt-4">
        {meals.map((meal) => (
          <div key={meal.id} className="border rounded p-3 mb-3 bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <h5>{meal.title}</h5>
              <span>{formatMealType(meal.mealType)}</span>
            </div>
            <p>Calories: {meal.calories} kcal</p>
            <div className="d-flex gap-2">
              <button
                className="btn btn-green"
                onClick={() => handleEditClick(meal)}
              >
                Edit
              </button>
              <button
                className="btn btn-green"
                onClick={() => handleDeleteClick(meal.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
