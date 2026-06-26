import React, { useState, useEffect } from "react";
import SnackForm from "../components/SnackForm.jsx";
import { Link } from "react-router-dom";

export default function Dashboard({ currentUser }) {
  const [meals, setMeals] = useState([]);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [calories, setCalories] = useState("250");
  const [mealType, setMealType] = useState("SNACK");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      setMeals([]);
      return;
    }

    fetch(
      `https://backend-production-cd17.up.railway.app/api/meals?userId=${currentUser.id}`,
    )
      .then((res) => res.json())
      .then((data) => setMeals(data))
      .catch((err) => console.error("Error loading meals for dashboard:", err));
  }, [currentUser]);

  function generateMeals() {
    setHasSearched(true);
    const typeMatched = meals.filter((meal) => meal.mealType === mealType);
    const calorieMatched = typeMatched.filter(
      (meal) => meal.calories <= Number(calories),
    );
    setResults(calorieMatched.slice(0, 5));
  }

  const handleSaveToPlan = (meal) => {
    console.log("Saving to today's plan", meal);

    if (!currentUser || !currentUser.id) {
      alert("You must be logged in to save meals to your plan!");
      return;
    }

    const planData = {
      user: { id: currentUser.id },
      idea: { id: meal.id },
    };

    fetch("https://backend-production-cd17.up.railway.app/api/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(planData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save meal to Today's Plan");
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage(`${meal.title} added to Today's Plan!`);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((err) => {
        console.error("Error saving to plan:", err);
        alert(`Could not add to plan: ${err.message}`);
      });
  };

  return (
    <div className="card card-narrow">
      <h1>Meal Planner</h1>
      <SnackForm
        calories={calories}
        setCalories={setCalories}
        mealType={mealType}
        setMealType={setMealType}
      />
      <div className="button-container">
        <button onClick={generateMeals}>Suggest Meals</button>
      </div>
      {(!currentUser || !currentUser.id) && (
        <p className="mt-4 text-center">
          Sign up or log in to add meals and get personalized meal suggestions!
        </p>
      )}
      {hasSearched && results.length === 0 ? (
        <p>"No matching meals found 🙁"</p>
      ) : null}
      <ul className="suggestions mt-3">
        {results.map((meal) => (
          <li
            key={meal.id}
            className="d-flex justify-content-between align-items-center gap-2"
          >
            <div>
              {meal.title} ({meal.calories} kcal)
            </div>
            <button
              className="btn btn-green"
              onClick={() => handleSaveToPlan(meal)}
            >
              Add to Today's Plan
            </button>
          </li>
        ))}
      </ul>

      {successMessage && (
        <div className="text-center py-2 mt-3">{successMessage}</div>
      )}
      <div className="d-flex gap-3 mt-5 w-100">
        <Link to="/recent-meals" className="btn button-white flex-fill">
          Recent Meals
        </Link>
        <Link to="/most-used" className="btn button-white flex-fill">
          Most Used Meals
        </Link>
      </div>
    </div>
  );
}
